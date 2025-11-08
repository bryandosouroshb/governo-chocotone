# 🔒 Como Aplicar as Regras de Segurança do Firestore

## 📋 Problema Atual
```
Missing or insufficient permissions.
```

As regras atuais do Firestore estão muito restritivas e bloqueiam até usuários autenticados de atualizar seus próprios dados.

## ✅ Solução: Aplicar Novas Regras

### Passo 1: Acessar o Console do Firebase

1. Abra: https://console.firebase.google.com/
2. Selecione o projeto: **governo-chocotone**
3. No menu lateral, clique em **"Firestore Database"**
4. Clique na aba **"Regras"** (Rules)

### Passo 2: Substituir as Regras

1. **Apague** todas as regras existentes na caixa de texto
2. **Copie** todo o conteúdo do arquivo `firestore.rules` deste repositório
3. **Cole** na caixa de regras do Firebase Console
4. Clique em **"Publicar"** (Publish)

### Passo 3: Testar

Após aplicar as regras:
1. Volte para `update-users-habbo.html`
2. Clique em **"▶️ ATUALIZAR USUÁRIOS"** novamente
3. Agora deve funcionar! ✅

---

## 📖 O Que as Novas Regras Permitem

### Collection: `users`
- ✅ **Read**: Qualquer usuário autenticado
- ✅ **Create**: Apenas Admin (Presidenta/Vice)
- ✅ **Update**: Admin OU o próprio usuário
- ✅ **Delete**: Apenas Admin

### Collection: `budgets`
- ✅ **Read**: Qualquer usuário autenticado
- ✅ **Create**: Apenas Admin
- ✅ **Update**: Admin OU ministro do ministério específico
- ✅ **Delete**: Apenas Admin

### Collection: `proposals`
- ✅ **Read**: Qualquer usuário autenticado
- ✅ **Create**: Qualquer usuário autenticado
- ✅ **Update**: Admin OU autor da proposta
- ✅ **Delete**: Apenas Admin

### Collection: `notifications`
- ✅ **Read**: Qualquer usuário autenticado
- ✅ **Create**: Apenas Admin
- ✅ **Update**: Qualquer usuário (para marcar como lida)
- ✅ **Delete**: Apenas Admin

---

## 🔍 Verificar Regras Atuais

No Firebase Console → Firestore → Regras, você deve ver algo assim:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;  // ← MUITO RESTRITIVO!
    }
  }
}
```

Isso bloqueia **tudo**. Por isso o erro de permissão.

---

## ⚡ Quick Fix (Temporário)

Se quiser liberar TUDO temporariamente para testar:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**⚠️ ATENÇÃO**: Isso permite que qualquer usuário autenticado faça qualquer coisa. Use apenas para testes!

---

## 📸 Screenshots do Processo

### Onde encontrar as Regras:
```
Firebase Console
└── Firestore Database
    └── Regras (aba no topo)
        └── [Editor de código]
            └── [Botão "Publicar"]
```

### Confirmação:
Após publicar, você verá:
```
✅ Regras publicadas com sucesso
Última atualização: [data/hora]
```

---

## 🐛 Troubleshooting

### Se continuar dando erro:

1. **Limpe o cache do navegador**
   - As regras antigas podem estar em cache
   - Ctrl+Shift+Delete → Limpar cache

2. **Aguarde 1-2 minutos**
   - As regras do Firestore levam alguns segundos para propagar

3. **Verifique no Console do Firebase**
   - Vá em Firestore → Regras
   - Confirme que as novas regras estão lá
   - Veja se não há erros de sintaxe (marcados em vermelho)

4. **Teste com regras abertas primeiro**
   - Use as regras "Quick Fix" acima
   - Se funcionar, o problema é nas regras
   - Depois aplique as regras completas

---

## 🔐 Segurança

As regras em `firestore.rules` são seguras e seguem o princípio do menor privilégio:

- ✅ Usuários só podem editar seus próprios dados
- ✅ Ministros só podem editar orçamentos de seus ministérios
- ✅ Admin tem controle total
- ✅ Nenhum acesso sem autenticação
- ✅ Previne edições maliciosas

---

**Próximo passo**: Aplicar as regras no Firebase Console! 🚀
