# 🚀 Deploy Vercel - ChocoBot Proxy (GRATUITO)

Proxy serverless 100% gratuito para proteger API key do OpenRouter.

## ✅ Vantagens Vercel
- ✅ **Totalmente gratuito** (sem cartão de crédito)
- ✅ **Requests ilimitados** (até 100GB bandwidth/mês)
- ✅ **Deploy em 2 minutos**
- ✅ HTTPS automático
- ✅ CORS configurado

---

## 📋 Passo a Passo (Super Fácil!)

### 1️⃣ Instalar Vercel CLI
```bash
npm install -g vercel
```

### 2️⃣ Login no Vercel
```bash
vercel login
```
- Vai abrir o navegador
- Faça login com GitHub (recomendado)

### 3️⃣ Deploy!
```bash
vercel
```

**Respostas do wizard:**
- `Set up and deploy "..."?` → **Y** (Yes)
- `Which scope?` → Escolha seu usuário (geralmente já selecionado)
- `Link to existing project?` → **N** (No)
- `What's your project's name?` → **governo-chocotone** (ou deixe default)
- `In which directory is your code located?` → **./** (tecle Enter)
- `Want to override the settings?` → **N** (No)

**Pronto!** 🎉 Vai aparecer algo como:
```
✅ Production: https://governo-chocotone.vercel.app
```

### 4️⃣ Pegar URL da API
Sua API estará em:
```
https://governo-chocotone.vercel.app/api/chocobot
```
(ou o domínio que aparecer no deploy)

---

## 🔧 Atualizar chocobot.html

Depois do deploy, atualize o `chocobot.html`:

```javascript
// Trocar esta linha:
const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {

// Por esta:
const response = await fetch('https://governo-chocotone.vercel.app/api/chocobot', {
```

E **REMOVER** o header `Authorization` (o proxy adiciona automaticamente):
```javascript
// REMOVER esta linha:
'Authorization': `Bearer ${API_CONFIG.apiKey}`,
```

---

## 🧪 Testar

Após deploy:
1. Abra `dashboard.html`
2. Clique no ChocoBot
3. Faça uma pergunta: "O que diz o Art. 1º da CF-RPG?"
4. Deve funcionar! ✅

---

## 🔄 Deploy de Atualizações

Sempre que mudar algo:
```bash
vercel --prod
```

---

## 📊 Monitoramento

Veja logs e estatísticas em:
https://vercel.com/dashboard

---

## 🆘 Troubleshooting

**Erro: Command not found: vercel**
```bash
npm install -g vercel
```

**Erro 404 na API:**
- Verifique se o arquivo está em `api/chocobot.js`
- Rode `vercel --prod` novamente

**Erro CORS:**
- Já está configurado no código! Se der erro, me avise.

---

## 🔐 Segurança

✅ API key está no arquivo `api/chocobot.js`  
✅ Arquivo **NÃO** vai pro GitHub (está no `.gitignore`)  
✅ Fica apenas no servidor da Vercel  
✅ Totalmente seguro! 🔒
