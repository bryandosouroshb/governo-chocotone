// Vercel Serverless Function - ChocoBot Proxy
// Protege a API key do OpenRouter

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export default async function handler(req, res) {
  // CORS Headers - SEMPRE primeiro (mesmo com headers no vercel.json, adicionar aqui também)
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  // Responder OPTIONS (preflight) - CRITICAL!
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Só aceita POST
  // Debug endpoint: retorna a chave mascarada quando chamado com ?debug=1
  // e com o header X-Debug-Secret igual ao valor da env DEBUG_SECRET.
  try {
    const reqUrl = new URL(req.url, `https://${req.headers.host}`);
    const debugFlag = reqUrl.searchParams.get('debug');
    const providedSecret = req.headers['x-debug-secret'] || req.headers['X-Debug-Secret'];
    const expectedSecret = process.env.DEBUG_SECRET;

    if (debugFlag === '1') {
      if (!expectedSecret) {
        return res.status(400).json({ error: 'DEBUG_SECRET not configured on server. Set DEBUG_SECRET in Vercel env vars to use debug endpoint.' });
      }

      if (!providedSecret || providedSecret !== expectedSecret) {
        return res.status(403).json({ error: 'Forbidden - invalid debug secret' });
      }

      const masked = `${OPENROUTER_API_KEY.slice(0,6)}...${OPENROUTER_API_KEY.slice(-6)}`;
      return res.status(200).json({ masked });
    }
  } catch (e) {
    // Se algo falhar na análise da URL, continuamos com o fluxo normal
    console.warn('Debug URL parse failed:', e.message);
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verificar se API key está configurada
  if (!OPENROUTER_API_KEY) {
    console.error('❌ OPENROUTER_API_KEY não está configurada!');
    return res.status(500).json({ 
      error: 'API key não configurada no servidor',
      message: 'Configure OPENROUTER_API_KEY nas variáveis de ambiente da Vercel'
    });
  }

  // Log mascarado para auxiliar debug sem vazar chave
  try {
    const masked = `${OPENROUTER_API_KEY.slice(0,6)}...${OPENROUTER_API_KEY.slice(-6)}`;
    // Use warn (visible in Vercel UI under warnings) to ensure it appears in filtered views
    console.warn('OPENROUTER_API_KEY present (masked):', masked);
  } catch (e) {
    console.warn('OPENROUTER_API_KEY present (unable to mask)');
  }

  try {
    // Fazer request para OpenRouter com a API key segura
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://bryandosouroshb.github.io/governo-chocotone/',
        'X-Title': 'ChocoBot - Governo Chocotone'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    // Se houver erro, logar e enriquecer resposta para debug
    if (!response.ok) {
      console.error('❌ Erro OpenRouter:', response.status, data);

      // Se for 401, adicionar mensagem mais explícita (não expor chave)
      if (response.status === 401) {
        return res.status(401).json({
          error: 'OpenRouter Unauthorized',
          status: 401,
          message: 'OpenRouter retornou 401 - verifique a chave OPENROUTER_API_KEY no painel da Vercel (possível chave inválida ou revogada).',
          detail: data
        });
      }

      return res.status(response.status).json(data);
    }

    // Retornar resposta para o cliente quando OK
    return res.status(200).json(data);
  } catch (error) {
    console.error('Erro no proxy:', error);
    return res.status(500).json({ 
      error: 'Erro ao conectar com OpenRouter',
      details: error.message 
    });
  }
}
