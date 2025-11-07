# 🔐 Permissões do Sistema - Governo Chocotone

## ✅ PRESIDENTA E VICE-PRESIDENTE: PODERES IDÊNTICOS

Ambos têm **EXATAMENTE** os mesmos privilégios em todas as páginas do sistema.

---

## 📄 **admin.html** - Painel Administrativo

### ✅ Acesso permitido:
```javascript
if (currentUser.role === 'Presidenta' || currentUser.role === 'Vice-Presidente')
```

### 🎯 Poderes:
- ✅ Ver todas as propostas pendentes (realtime)
- ✅ Ver histórico completo de decisões (realtime)
- ✅ **Aprovar** propostas
- ✅ **Rejeitar** propostas
- ✅ **Solicitar ajustes** em propostas
- ✅ Adicionar feedback em todas as ações
- ✅ Criar notificações automáticas para ministros

**Resultado:** Ambos aprovam, rejeitam e solicitam ajustes **igualmente**.

---

## 📋 **submit-proposal.html** - Submissão de Propostas

### ✅ Funcionalidades especiais:
```javascript
if (currentUser.role === 'Presidenta' || currentUser.role === 'Vice-Presidente')
```

### 🎯 Poderes:
- ✅ Dropdown de nomes (podem submeter em nome de qualquer ministro)
- ✅ Acesso a todos os orçamentos dos ministérios
- ✅ Podem emitir **Decretos** e **Medidas Provisórias**
- ✅ Validação automática do tipo de documento

**Resultado:** Ambos podem legislar por todos os ministérios **igualmente**.

---

## 📊 **dashboard.html** - Painel Principal

### ✅ Botões administrativos:
```javascript
if (userData.role === 'Presidenta' || userData.role === 'Vice-Presidente') {
    document.getElementById('btnAdmin').style.display = 'block';
    document.getElementById('btnUpdateIndicators').style.display = 'block';
}
```

### 🎯 Poderes:
- ✅ Botão "Painel Admin" visível
- ✅ Botão "Atualizar Indicadores" visível
- ✅ Veem **todas** as propostas aprovadas (não só as suas)
- ✅ Podem marcar propostas como "Publicado" e "Em Vigor"
- ✅ Recebem notificações de **todas** as submissões

### 📨 Notificações:
```javascript
targetUsers: ['Presidenta', 'Vice-Presidente']
```
**Resultado:** Ambos recebem as mesmas notificações **simultaneamente**.

---

## 🔥 **Firestore Security Rules**

### Regra de Admin:
```javascript
function isAdmin() {
  return request.auth != null && 
         (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'Presidenta' ||
          get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'Vice-Presidente');
}
```

### 🎯 Permissões no Firestore:
- ✅ **Aprovar/Rejeitar propostas:** `isAdmin()` permite para ambos
- ✅ **Atualizar orçamentos:** `isAdmin()` permite para ambos
- ✅ **Criar notificações:** Qualquer usuário autenticado pode
- ✅ **Ler todas as propostas:** Todos autenticados podem ler

**Resultado:** No banco de dados, ambos têm privilégios administrativos **idênticos**.

---

## 📌 **Resumo: Igualdade Total**

| Funcionalidade | Presidenta | Vice-Presidente |
|----------------|------------|-----------------|
| Aprovar propostas | ✅ | ✅ |
| Rejeitar propostas | ✅ | ✅ |
| Solicitar ajustes | ✅ | ✅ |
| Ver painel admin | ✅ | ✅ |
| Emitir Decretos/MPs | ✅ | ✅ |
| Submeter por outros ministros | ✅ | ✅ |
| Ver todas as propostas | ✅ | ✅ |
| Receber notificações | ✅ | ✅ |
| Marcar como publicado | ✅ | ✅ |
| Atualizar indicadores | ✅ | ✅ |

---

## 🚀 **Implementação Técnica**

Todas as verificações usam o operador lógico `||` (OU):

```javascript
// ✅ CORRETO - Ambos têm acesso
if (role === 'Presidenta' || role === 'Vice-Presidente')

// ❌ ERRADO - Apenas Presidenta teria acesso
if (role === 'Presidenta')
```

**Status:** ✅ **TODAS AS VERIFICAÇÕES ESTÃO CORRETAS**

---

## 🎯 **Conclusão**

O sistema foi projetado com **paridade total** entre Presidenta e Vice-Presidente. 

Ambos podem:
1. Acessar todas as áreas administrativas
2. Tomar todas as decisões sobre propostas
3. Receber as mesmas notificações em tempo real
4. Executar todas as funções legislativas
5. Gerenciar o sistema completo

**Não há diferença de poderes entre os dois cargos no sistema.**
