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

    // Se houver erro, logar
    if (!response.ok) {
      console.error('❌ Erro OpenRouter:', response.status, data);
    }

    // Retornar resposta para o cliente
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Erro no proxy:', error);
    return res.status(500).json({ 
      error: 'Erro ao conectar com OpenRouter',
      details: error.message 
    });
  }
}
