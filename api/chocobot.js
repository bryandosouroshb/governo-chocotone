// Vercel Serverless Function - ChocoBot Proxy
// Protege a API key do OpenRouter
// Versão Corrigida: 2025-11-09 - Sintaxe validada

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export default async function handler(req, res) {
  // CORS Headers - SEMPRE primeiro
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  // Responder à requisição preflight OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // --- Início do Bloco de Debug Corrigido ---
  // Usa req.query, que é a forma correta da Vercel para ler parâmetros de URL (?debug=1).
  const { debug } = req.query;

  if (debug === '1') {
    const providedSecret = req.headers['x-debug-secret'] || req.headers['X-Debug-Secret'];
    const expectedSecret = process.env.DEBUG_SECRET;

    if (!expectedSecret) {
      return res.status(400).json({ error: 'DEBUG_SECRET not configured on server.' });
    }

    if (providedSecret !== expectedSecret) {
      return res.status(403).json({ error: 'Forbidden - invalid debug secret.' });
    }
    
    // Se a requisição for de debug, verificamos e retornamos a chave mascarada.
    if (!OPENROUTER_API_KEY) {
       return res.status(500).json({ error: 'Server check: OPENROUTER_API_KEY is NOT DEFINED.' });
    }

    try {
      const masked = `${OPENROUTER_API_KEY.slice(0, 6)}...${OPENROUTER_API_KEY.slice(-6)}`;
      return res.status(200).json({ masked_key: masked, message: 'Server check: OPENROUTER_API_KEY is present.' });
    } catch (e) {
      return res.status(500).json({ error: 'Server check: OPENROUTER_API_KEY is present but invalid (cannot be masked).' });
    }
  }
  // --- Fim do Bloco de Debug Corrigido ---

  // A partir daqui, o fluxo é apenas para requisições de API normais.
  // Rejeita qualquer método que não seja POST.
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST for API calls.' });
  }

  // Verificar se a API key está configurada no ambiente
  if (!OPENROUTER_API_KEY) {
    console.error('❌ FATAL: OPENROUTER_API_KEY não está configurada!');
    return res.status(500).json({ 
      error: 'API key não configurada no servidor.',
      message: 'Configure a variável de ambiente OPENROUTER_API_KEY no painel da Vercel.'
    });
  }

  // Loga a chave mascarada em toda chamada para confirmar que está sendo lida
  try {
    const masked = `${OPENROUTER_API_KEY.slice(0, 6)}...${OPENROUTER_API_KEY.slice(-6)}`;
    console.warn('API Key Loaded (masked):', masked);
  } catch (e) {
    console.warn('API Key Loaded (unable to mask)');
  }

  try {
    // Faz a chamada real para a API do OpenRouter
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://bryandosouroshb.github.io/governo-chocotone/', // Opcional, mas boa prática
        'X-Title': 'ChocoBot - Governo Chocotone' // Opcional
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    // Se a resposta do OpenRouter não for OK, enriquece o erro
    if (!response.ok) {
      console.error('❌ Erro retornado pelo OpenRouter:', response.status, data);

      if (response.status === 401) {
        return res.status(401).json({
          error: 'OpenRouter Unauthorized',
          status: 401,
          message: 'O OpenRouter retornou 401. A chave API em OPENROUTER_API_KEY pode ser inválida, revogada ou não ter sido carregada corretamente.',
          detail: data
        });
      }

      return res.status(response.status).json(data);
    }

    // Se tudo deu certo, retorna a resposta do OpenRouter para o cliente
    return res.status(200).json(data);

  } catch (error) {
    console.error('❌ Erro crítico no proxy fetch:', error);
    return res.status(500).json({ 
      error: 'Erro interno ao tentar conectar com o OpenRouter.',
      details: error.message 
    });
  }
}