# 🏛️ Sistema de Gestão Orçamentária - Governo Federal Chocotone

Sistema completo de gestão orçamentária desenvolvido para o Governo Federal Chocotone no Congresso Nacional Habbo.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Sistema](#estrutura-do-sistema)
- [Configuração Inicial](#configuração-inicial)
- [Deploy no Google Sites](#deploy-no-google-sites)
- [Configuração do Google Apps Script](#configuração-do-google-apps-script)
- [Senhas de Acesso](#senhas-de-acesso)
- [Guia de Uso](#guia-de-uso)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Visão Geral

Sistema web moderno para gestão transparente e eficiente do orçamento federal, permitindo:

- ✅ Submissão de propostas orçamentárias pelos ministros
- ⚖️ Análise de constitucionalidade integrada (NotebookLM)
- 👥 Aprovação/rejeição pela Presidência
- 📊 Dashboard em tempo real com indicadores econômicos
- 💰 Controle rigoroso do teto de gastos (R$ 1,9 trilhão)
- 📄 Extrato completo com filtros avançados
- 🔐 Sistema de autenticação por cargos

---

## ⭐ Funcionalidades

### 🏠 Dashboard Principal (`index.html`)
- Orçamento total disponível em tempo real
- Indicador do teto de gastos constitucional
- 4 cards principais: Receita, Despesa, Superávit, Dívida/PIB
- Tabela de orçamento por ministério (12 ministérios)
- Indicadores econômicos atualizados (via API externa)
- Alertas automáticos quando próximo ao teto

### 📝 Submissão de Propostas (`submit-proposal.html`)
- Dropdown com 12 membros do governo
- Preenchimento automático de cargo/ministério
- Tipos de documento: Ofício, Portaria, Decreto, MP
- Validação em tempo real do orçamento disponível
- Integração com NotebookLM para análise constitucional
- Checkbox obrigatório de conformidade

### ⚙️ Painel Administrativo (`admin.html`)
- **Acesso exclusivo:** Presidenta e Vice-Presidente
- **Aba Propostas Pendentes:** Aprovar/Rejeitar/Ajustar
- **Aba Controles:** Ajustar orçamentos manualmente
- **Aba Histórico:** Todas as decisões tomadas
- Modais para cada ação com campos de observações

### 📄 Extrato Orçamentário (`extract.html`)
- Timeline visual de todas as transações
- Filtros: Ministério, Tipo, Data Início/Fim
- Cards resumo: Receita, Despesa, Saldo
- Diferenciação visual (receitas/despesas)
- Exportação para PDF

### 🔐 Sistema de Login (`login.html`)
- Dropdown com todos os membros do governo
- 3 níveis de senha (Presidenta, Vice, Ministros)
- Validação rigorosa de credenciais
- Redirecionamento automático se já logado

---

## 📁 Estrutura do Sistema

```
SYSTEM_GOVERNO_FEDERAL/
│
├── index.html                  # Dashboard principal
├── login.html                  # Tela de autenticação
├── submit-proposal.html        # Formulário de propostas
├── admin.html                  # Painel administrativo
├── extract.html                # Extrato orçamentário
├── GOOGLE_APPS_SCRIPT.js       # Backend (Google Sheets)
└── README.md                   # Este arquivo
```

---

## 🚀 Configuração Inicial

### Pré-requisitos

- Conta Google (Gmail)
- Acesso ao Google Sites
- Acesso ao Google Sheets
- Navegador moderno (Chrome, Edge, Firefox)

---

## 🌐 Deploy no Google Sites

### Passo 1: Criar Novo Site

1. Acesse [Google Sites](https://sites.google.com)
2. Clique em **"Criar"** (botão +)
3. Escolha **"Site em branco"**
4. Nomeie: **"Sistema Orçamentário Governo Chocotone"**

### Passo 2: Configurar Páginas

1. **Página Inicial (Login):**
   - Clique em **"Páginas"** no painel direito
   - Renomeie a página inicial para **"Login"**
   - Clique em **"Inserir" > "Incorporar" > "Incorporar código"**
   - Cole o conteúdo completo de `login.html`
   - Salve

2. **Criar Página Dashboard:**
   - Clique em **"+" (Nova página)**
   - Nome: **"Dashboard"**
   - Incorpore o código de `index.html`

3. **Criar Página Submissão:**
   - Nova página: **"Submeter Proposta"**
   - Incorpore `submit-proposal.html`

4. **Criar Página Admin:**
   - Nova página: **"Admin"**
   - Incorpore `admin.html`

5. **Criar Página Extrato:**
   - Nova página: **"Extrato"**
   - Incorpore `extract.html`

### Passo 3: Ajustar Navegação

1. No menu principal do site, mantenha apenas **"Login"** visível
2. As outras páginas serão acessadas via botões internos
3. Desmarque a opção de mostrar outras páginas no menu

### Passo 4: Publicar

1. Clique em **"Publicar"** (canto superior direito)
2. Escolha a URL: `sistema-orcamentario-chocotone` (ou outra disponível)
3. Configure visibilidade:
   - ⚠️ **Importante:** Escolha "Público" ou "Qualquer pessoa com o link"
4. Clique em **"Publicar"**

---

## 📊 Configuração do Google Apps Script

### Passo 1: Criar Planilha

1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie nova planilha: **"Sistema Orçamentário Governo Chocotone"**
3. Crie 4 abas (sheets):
   - **Propostas**
   - **Orçamentos**
   - **Histórico**
   - **Configurações**

### Passo 2: Adicionar Script

1. Na planilha, clique em **"Extensões" > "Apps Script"**
2. Delete o código padrão
3. Cole o conteúdo completo de `GOOGLE_APPS_SCRIPT.js`
4. Renomeie o projeto: **"API Sistema Orçamentário"**
5. Salve (Ctrl+S ou ⌘+S)

### Passo 3: Inicializar Sistema

1. No editor do Apps Script, execute a função:
   - Selecione **`initializeSheets`** no dropdown
   - Clique em **"Executar"** (▶️)
2. **Primeira execução:** Autorize o script
   - Clique em **"Revisar permissões"**
   - Escolha sua conta Google
   - Clique em **"Avançado"** (se aparecer aviso)
   - Clique em **"Ir para [nome do projeto] (não seguro)"**
   - Clique em **"Permitir"**
3. Aguarde a execução (verá "Execução concluída")

### Passo 4: Fazer Deploy

1. Clique em **"Implantar" > "Nova implantação"**
2. Em **"Tipo"**, selecione **"Aplicativo da Web"**
3. Configure:
   - **Descrição:** "API Sistema Orçamentário v1.0"
   - **Executar como:** Eu
   - **Quem tem acesso:** Qualquer pessoa
4. Clique em **"Implantar"**
5. **IMPORTANTE:** Copie a URL gerada (começa com `https://script.google.com/...`)

### Passo 5: Atualizar URLs nos HTMLs

Substitua `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` pela URL copiada em:

- `index.html` (linha ~720)
- `submit-proposal.html` (linha ~620)
- `admin.html` (sem URL configurada ainda)
- `extract.html` (sem URL configurada ainda)

**Como fazer:**
```javascript
// ANTES:
const CONFIG = {
    SHEETS_API_URL: 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE',
    ...
};

// DEPOIS:
const CONFIG = {
    SHEETS_API_URL: 'https://script.google.com/macros/s/SEU_ID_AQUI/exec',
    ...
};
```

Após alterar, **republicar as páginas no Google Sites** com o código atualizado.

---

## 🔐 Senhas de Acesso

### Credenciais do Sistema

| Cargo | Usuário | Senha |
|-------|---------|-------|
| **Presidenta** | Chocotone | `GovChoco2025!` |
| **Vice-Presidente** | Bryan dos Ouros | `ViceGov2025#` |
| **Todos os Ministros** | (10 ministros) | `Ministro2025@` |

### Lista de Ministros

1. **Iasmin** - Ministra da Casa Civil
2. **Lucca** - Ministro da Economia e Trabalho
3. **Rafael** - Ministro da Saúde
4. **Sophia** - Ministra da Educação, Ciência e Tecnologia
5. **Pedro** - Ministro da Cultura e Esporte
6. **Beatriz** - Ministra da Defesa
7. **Gabriel** - Ministro da Justiça e Segurança Pública
8. **Julia** - Ministra da Infraestrutura
9. **Miguel** - Ministro da Agricultura e Meio Ambiente
10. **Laura** - Ministra da Cidadania e Desenvolvimento Social
11. **Matheus** - Advogado-Geral da União
12. **Isabella** - Chefe de Gabinete da Presidência

---

## 📖 Guia de Uso

### Para Ministros

#### 1. Fazer Login
1. Acesse o sistema
2. Selecione seu nome no dropdown
3. Digite a senha: `Ministro2025@`
4. Clique em **"Entrar no Sistema"**

#### 2. Submeter Proposta
1. No dashboard, clique em **"📝 Submeter Proposta"**
2. Seu nome já estará selecionado
3. Preencha:
   - **Tipo de Documento** (Ofício/Portaria)
   - **Custo Estimado** (valida em tempo real)
   - **Ementa** (resumo)
   - **Corpo** (conteúdo completo)
   - **Justificativa** (fundamentação)
4. Clique em **"🔍 Analisar Constitucionalidade"** (abre NotebookLM)
5. Marque o checkbox de conformidade
6. Clique em **"✅ Submeter Proposta"**

#### 3. Acompanhar Status
- Aguarde aprovação da Presidência
- Você será notificado sobre o status

### Para Presidenta/Vice

#### 1. Acessar Painel Admin
1. Faça login com sua senha específica
2. No dashboard, clique em **"⚙️ Painel Administrativo"**

#### 2. Analisar Propostas
1. Aba **"Propostas Pendentes"**
2. Revise cada proposta:
   - Leia ementa, corpo e justificativa
   - Veja o custo estimado
   - Clique em **"👁️ Ver Detalhes"** para mais info
3. Decida:
   - **✓ Aprovar:** Orçamento é debitado automaticamente
   - **✗ Rejeitar:** Informe o motivo
   - **✏️ Solicitar Ajustes:** Descreva as alterações necessárias

#### 3. Controles Manuais
1. Aba **"Controles Manuais"**
2. Opções:
   - **Ajustar Orçamento Ministerial** (casos excepcionais)
   - **Atualizar Indicadores** (forçar refresh)
   - **Resetar Sistema** (cuidado! irreversível)
   - **Exportar Dados** (backup JSON)

#### 4. Histórico
1. Aba **"Histórico"**
2. Veja todas as decisões tomadas
3. Revise aprovações e rejeições anteriores

### Para Todos

#### Ver Extrato
1. Clique em **"📄 Ver Extrato Completo"**
2. Use filtros:
   - **Ministério:** Ver gastos específicos
   - **Tipo:** Ofícios, Portarias, Decretos, MPs
   - **Data:** Período específico
3. Clique em **"📥 Exportar PDF"** para imprimir/salvar

---

## 🔧 Troubleshooting

### Problema: "Erro ao carregar indicadores"

**Solução:**
- Verifique sua conexão com a internet
- A API externa pode estar temporariamente indisponível
- Clique no botão **"🔄 Atualizar Agora"** manualmente

### Problema: "Proposta não enviada"

**Soluções:**
1. Verifique se preencheu todos os campos obrigatórios (*)
2. Confirme que marcou o checkbox de constitucionalidade
3. Verifique se o custo não excede o orçamento disponível
4. Se persistir, verifique se a URL do Google Apps Script está correta

### Problema: "Erro 403 - Acesso Negado" no Apps Script

**Solução:**
1. Volte ao Google Apps Script
2. Clique em **"Implantar" > "Gerenciar implantações"**
3. Clique em **"Editar"** (ícone de lápis)
4. Mude **"Quem tem acesso"** para **"Qualquer pessoa"**
5. Clique em **"Implantar"**

### Problema: Senhas não funcionam

**Solução:**
- Digite exatamente como mostrado (maiúsculas/minúsculas importam)
- Presidenta: `GovChoco2025!`
- Vice: `ViceGov2025#`
- Ministros: `Ministro2025@`

### Problema: Orçamento não atualiza após aprovação

**Solução:**
1. Verifique se o Google Apps Script está rodando
2. Execute manualmente `testGetBudgets()` no Apps Script
3. Verifique a aba **"Orçamentos"** na planilha
4. Se necessário, use **"Controles Manuais"** para ajustar

### Problema: Página em branco no Google Sites

**Solução:**
1. Certifique-se de que colou o código HTML **completo** (incluindo `<!DOCTYPE html>`)
2. Verifique se não há caracteres especiais que quebraram o código
3. Tente usar **"Incorporar por URL"** se disponível
4. Como alternativa, hospede em outro serviço (GitHub Pages, Netlify)

---

## 📊 Estrutura do Google Sheets

### Aba: Propostas
| Coluna | Descrição |
|--------|-----------|
| ID | Identificador único (PROP-timestamp) |
| Data Submissão | Data/hora do envio |
| Solicitante | Nome do ministro |
| Cargo | Posição no governo |
| Ministério | Ministério responsável |
| Tipo Documento | Ofício/Portaria/Decreto/MP |
| Ementa | Resumo da proposta |
| Corpo | Conteúdo completo |
| Justificativa | Fundamentação |
| Custo Estimado | Valor em reais |
| Status | pending/approved/rejected/adjustments_requested |
| Data Processo | Quando foi processada |
| Processado Por | Quem aprovou/rejeitou |
| Observações | Notas adicionais |

### Aba: Orçamentos
| Coluna | Descrição |
|--------|-----------|
| Ministério | Nome do ministério |
| Orçamento Total | Valor alocado pela LOA |
| Gasto Acumulado | Total já comprometido |
| Disponível | Restante para gastar |
| % Executado | Percentual utilizado |
| Última Atualização | Timestamp |

### Aba: Histórico
| Coluna | Descrição |
|--------|-----------|
| ID | Identificador da operação |
| Data | Timestamp |
| Tipo Operação | Submissão/Aprovação/Rejeição/Ajuste |
| Usuário | Quem executou |
| Detalhes | Descrição |
| Valor | Impacto financeiro |

### Aba: Configurações
| Chave | Valor |
|-------|-------|
| Teto de Gastos | 1900000000000 (R$ 1,9 trilhão) |
| Receita Total | 4392000000000 (R$ 4,392 trilhões) |
| Última Atualização | Timestamp |

---

## 🎨 Customização

### Alterar Logo do Governo
Edite em todos os HTMLs a linha:
```html
<div class="logo-badge"></div>
```

Substitua o `background: url(...)` por sua própria URL de badge.

### Alterar Cores do Sistema
No CSS de cada arquivo, modifique as variáveis:
```css
:root {
    --primary-color: #1a237e;    /* Azul escuro */
    --accent-color: #ffd700;      /* Dourado */
    --success-color: #4caf50;     /* Verde */
    --danger-color: #f44336;      /* Vermelho */
    --warning-color: #ff9800;     /* Laranja */
}
```

### Adicionar Novos Ministérios
1. No `GOOGLE_APPS_SCRIPT.js`, adicione em `MINISTRIES`
2. Atualize em todos os HTMLs o array de ministérios
3. Execute `initializeSheets()` novamente no Apps Script

---

## 🔒 Segurança

### Recomendações

1. ⚠️ **Não compartilhe as senhas publicamente**
2. 🔐 Altere as senhas periodicamente (edite `login.html`)
3. 📊 Faça backups regulares da planilha Google Sheets
4. 🔍 Monitore o histórico de operações
5. 🚫 Limite o acesso à planilha apenas para administradores

### Alterar Senhas

Edite em `login.html`:
```javascript
const PASSWORDS = {
    presidenta: 'SUA_NOVA_SENHA_AQUI',
    vice: 'SUA_NOVA_SENHA_AQUI',
    ministros: 'SUA_NOVA_SENHA_AQUI'
};
```

---

## 📞 Suporte

Para problemas técnicos ou dúvidas:
1. Revise este README completamente
2. Verifique a seção [Troubleshooting](#troubleshooting)
3. Teste as funções de teste no Apps Script
4. Entre em contato com o desenvolvedor do sistema

---

## 📝 Changelog

### v1.0 (07/11/2025)
- ✅ Lançamento inicial do sistema
- ✅ Dashboard com indicadores em tempo real
- ✅ Sistema de submissão de propostas
- ✅ Painel administrativo completo
- ✅ Extrato orçamentário com filtros
- ✅ Integração com Google Sheets
- ✅ Sistema de autenticação por senhas
- ✅ Validação de teto de gastos
- ✅ Integração com NotebookLM (análise constitucional)
- ✅ Design responsivo e moderno

---

## 🏆 Créditos

**Sistema desenvolvido para:**
- 🏛️ Governo Federal Chocotone
- 🗳️ Congresso Nacional Habbo

**Tecnologias utilizadas:**
- HTML5, CSS3, JavaScript (Vanilla)
- Google Sheets (Banco de dados)
- Google Apps Script (Backend)
- Google Sites (Hospedagem)
- NotebookLM (Análise constitucional)
- API Externa (Indicadores econômicos)

---

## 📜 Licença

Sistema proprietário do Governo Federal Chocotone.
Uso restrito aos membros autorizados.

---

**Versão:** 1.0  
**Data:** 07 de Novembro de 2025  
**Status:** ✅ Operacional

🇧🇷 **Governo Federal Chocotone** - Transparência, Eficiência e Inovação
