# 🔥 Setup Firebase Functions - ChocoBot Proxy

Este proxy protege a API key do OpenRouter, permitindo que o ChocoBot funcione em mobile/desktop sem expor credenciais.

## 📋 Pré-requisitos

1. Node.js instalado
2. Firebase CLI instalado: `npm install -g firebase-tools`
3. Projeto Firebase criado (já temos: governo-chocotone-8e2fa)

## 🚀 Deploy do Proxy (Passo a passo)

### 1. Login no Firebase
```bash
firebase login
```

### 2. Inicializar Functions (se ainda não fez)
```bash
firebase init functions
# Selecione: JavaScript
# Use projeto existente: governo-chocotone-8e2fa
```

### 3. Instalar dependências
```bash
cd functions
npm install
cd ..
```

### 4. Configurar API Key do OpenRouter (IMPORTANTE!)
```bash
firebase functions:config:set openrouter.key="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"
```

### 5. Deploy da função
```bash
firebase deploy --only functions
```

Após o deploy, você receberá uma URL tipo:
```
https://us-central1-governo-chocotone-8e2fa.cloudfunctions.net/chocobotProxy
```

### 6. Atualizar chocobot.html

Substitua a URL da API no `chocobot.html`:
```javascript
// ANTES (direto no OpenRouter - inseguro)
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// DEPOIS (via proxy Firebase - seguro)
const API_URL = 'https://us-central1-governo-chocotone-8e2fa.cloudfunctions.net/chocobotProxy';
```

E remova o header `Authorization` do fetch (o proxy adiciona automaticamente).

## ✅ Vantagens

- ✅ API key 100% segura (só existe no Firebase)
- ✅ Funciona em mobile/desktop/qualquer dispositivo
- ✅ CORS configurado (GitHub Pages funciona)
- ✅ Gratuito até 2M chamadas/mês
- ✅ Logs automáticos no Firebase Console

## 🔐 Segurança

A API key NUNCA vai pro GitHub ou para o navegador do usuário. Fica apenas no Firebase Functions Config.

## 📊 Monitoramento

Veja estatísticas em:
https://console.firebase.google.com/project/governo-chocotone-8e2fa/functions

## 🆘 Troubleshooting

**Erro CORS:**
- Verifique se o domínio está correto no proxy (linha 23 do index.js)

**Erro 401 (Unauthorized):**
- API key não configurada. Execute o passo 4 novamente

**Função não responde:**
- Aguarde 1-2 minutos após deploy (cold start)
- Veja logs: `firebase functions:log`
