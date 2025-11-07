# 🔧 SOLUÇÃO PARA ERRO 404 NO GOOGLE SITES

## ❌ ERRO ATUAL

Ao fazer login no sistema, você está sendo redirecionado para:
```
https://sites.google.com/embeds/16cb204cf3a9d4d223a0a3fd8b0eec5d/index.html
```

**Resultado:** `404 - That's an error`

---

## 🔍 DIAGNÓSTICO DO PROBLEMA

O Google Sites **NÃO suporta** navegação direta entre páginas HTML incorporadas usando `window.location.href`.

Quando você incorpora HTML em uma página do Google Sites, cada página HTML está "isolada" em um iframe. O redirecionamento via JavaScript (`window.location.href = 'index.html'`) **não funciona** porque:

1. O Google Sites não hospeda arquivos HTML como um servidor tradicional
2. Cada página incorporada está em um iframe separado
3. Não existe uma estrutura de URLs `/index.html`, `/admin.html`, etc.

---

## ✅ SOLUÇÕES POSSÍVEIS

### **OPÇÃO 1: Usar Botões/Links do Google Sites (RECOMENDADO)**

Em vez de redirecionamento JavaScript, você deve:

1. **No Google Sites:**
   - Criar 5 páginas separadas (Login, Dashboard, Submissão, Admin, Extrato)
   - Em cada página, usar **botões nativos do Google Sites** que linkam para as outras páginas
   - Remover o código de redirecionamento JavaScript

2. **Modificar o HTML:**
   - Remover linhas de redirecionamento como:
     ```javascript
     window.location.href = 'index.html';
     ```
   - Substituir por mensagens com instruções:
     ```javascript
     alert('Login realizado! Use o menu de navegação acima para acessar o Dashboard.');
     ```

**VANTAGEM:** Funciona perfeitamente no Google Sites
**DESVANTAGEM:** Usuário precisa usar navegação manual

---

### **OPÇÃO 2: Sistema em Página Única (SPA - Single Page Application)**

Consolidar TUDO em um único arquivo HTML que troca de "tela" dinamicamente:

- Criar **um único arquivo HTML** com todas as telas (login, dashboard, etc.)
- Usar JavaScript para mostrar/ocultar divs conforme navegação
- Incorporar apenas **uma página** no Google Sites

**VANTAGEM:** Navegação automática funciona
**DESVANTAGEM:** Arquivo HTML gigante (difícil de manter)

---

### **OPÇÃO 3: Hospedar em GitHub Pages ou Vercel (MELHOR SOLUÇÃO)**

Hospedar o sistema completo em um servidor gratuito que suporte HTML estático:

**GitHub Pages:**
1. Criar repositório no GitHub
2. Fazer upload de todos os arquivos HTML
3. Ativar GitHub Pages nas configurações
4. URL final: `https://seu-usuario.github.io/sistema-orcamento/`

**Vercel:**
1. Criar conta em vercel.com
2. Importar pasta do projeto
3. Deploy automático
4. URL final: `https://sistema-orcamento.vercel.app/`

**VANTAGEM:** Sistema funciona 100% como projetado, navegação automática
**DESVANTAGEM:** Precisa criar conta externa

---

## 🎯 RECOMENDAÇÃO FINAL

**Para usar no Google Sites (como está):**

### Passos para Corrigir:

1. **Criar 5 páginas no Google Sites:**
   - Página 1: "Login"
   - Página 2: "Dashboard"
   - Página 3: "Submeter Proposta"
   - Página 4: "Administração"
   - Página 5: "Extrato"

2. **Em cada página:**
   - Inserir o HTML correspondente via "Incorporar código"
   - Adicionar botões de navegação usando o menu do Google Sites

3. **Modificar os arquivos HTML:**
   - **login.html:** Substituir linha 277
     ```javascript
     // ANTES:
     window.location.href = 'index.html';
     
     // DEPOIS:
     alert('✅ Login realizado com sucesso!\\n\\nUse o menu de navegação acima para acessar o Dashboard.');
     localStorage.setItem('govUser', JSON.stringify(userData));
     ```

   - **Adicionar em TODAS as páginas** (no topo do HTML, dentro do `<header>`):
     ```html
     <div style="background: #667eea; padding: 10px; text-align: center;">
         <a href="/dashboard" style="color: white; margin: 0 15px;">🏠 Dashboard</a>
         <a href="/submeter" style="color: white; margin: 0 15px;">📝 Submeter</a>
         <a href="/admin" style="color: white; margin: 0 15px;">👑 Admin</a>
         <a href="/extrato" style="color: white; margin: 0 15px;">📊 Extrato</a>
         <button onclick="logout()" style="color: white; background: #f44336; border: none; padding: 5px 15px; cursor: pointer;">🚪 Sair</button>
     </div>
     ```

4. **Configurar links no Google Sites:**
   - Cada link acima (`/dashboard`, `/submeter`, etc.) deve apontar para as páginas correspondentes do Google Sites

---

## 📋 ARQUIVOS QUE PRECISAM SER MODIFICADOS

### login.html (linha ~277):
```javascript
// Remover ou comentar:
// window.location.href = 'index.html';

// Adicionar:
alert('✅ Login realizado! Use o menu acima para navegar.');
```

### index.html, submit-proposal.html, admin.html, extract.html:
- Adicionar barra de navegação manual no topo
- Remover qualquer `window.location.href` que redirecione

---

## 🚀 DEPLOY ALTERNATIVO (RECOMENDADO)

Se quiser que o sistema funcione **exatamente como projetado**, use **GitHub Pages**:

1. Criar conta no GitHub (github.com)
2. Criar novo repositório "sistema-orcamento-governo"
3. Upload dos arquivos HTML
4. Settings > Pages > Ativar GitHub Pages
5. Pronto! URL: `https://seu-usuario.github.io/sistema-orcamento-governo/login.html`

**Vantagens:**
- ✅ Navegação automática funciona
- ✅ Gratuito
- ✅ HTTPS seguro
- ✅ Fácil atualização (só fazer upload de novos arquivos)

---

## 📞 PRÓXIMO PASSO

Escolha uma das opções:

1. **Google Sites + Navegação Manual** → Modificar HTMLs conforme instruído acima
2. **GitHub Pages** → Criar repositório e fazer deploy (5 minutos)

**Qual você prefere?** 🤔
