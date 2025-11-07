# 🔐 CREDENCIAIS DO SISTEMA - GOVERNO CHOCOTONE

## ⚠️ DOCUMENTO CONFIDENCIAL - USO RESTRITO

---

## 🔑 Senhas de Acesso ao Sistema

### 👑 PRESIDÊNCIA

**Presidenta da República**
- **Usuário:** Chocotone
- **Senha:** `GovChoco2025!`
- **Permissões:** Acesso total (Dashboard, Submissão, Admin, Extrato)

**Vice-Presidente da República**
- **Usuário:** Bryan dos Ouros / bryandosouros
- **Senha:** `ViceGov2025#`
- **Cargo Adicional:** Ministro da Casa Civil
- **Permissões:** Acesso total (Dashboard, Submissão, Admin, Extrato)

---

### 🏛️ MINISTROS (SENHA ÚNICA)

**Senha para TODOS os ministros:** `Ministro2025@`

**Lista de Ministros (GOVERNO CHOCOTONE - DECRETO Nº 003/2025):**

1. **-Furia-** - Ministro da Economia e Trabalho
   - Orçamento: R$ 250 bilhões

2. **joaobatistagc** - Ministro da Saúde
   - Orçamento: R$ 200 bilhões

3. **Stroch** - Ministro da Educação, Ciência e Tecnologia
   - Orçamento: R$ 260 bilhões

4. **Nyxalis** - Ministra da Cidadania, Desenvolvimento Social, Direitos Humanos e Povos Originários
   - Orçamento: R$ 250 bilhões

5. **MalopRRN** - Ministro da Defesa
   - Orçamento: R$ 150 bilhões

6. **guguinhoHop** - Ministro da Justiça e Segurança Pública
   - Orçamento: R$ 120 bilhões

7. **Dj.Bigoreia** - Ministro da Infraestrutura
   - Orçamento: R$ 300 bilhões

8. **Fabio-Blunt-UK** - Ministro da Agricultura, Meio Ambiente, Turismo e Desenvolvimento Rural
   - Orçamento: R$ 130 bilhões

9. **Brenda.M** - Ministra da Cultura e Esporte
   - Orçamento: R$ 45 bilhões

10. **Stallley** - Advogado-Geral da União
    - Orçamento: R$ 30 bilhões

**NOTA:** Bryan dos Ouros (Vice-Presidente) também acumula o cargo de Ministro da Casa Civil (R$ 15 bilhões).

**Total de Membros do Governo:** 12 (1 Presidenta + 1 Vice/Ministro + 10 Ministros)

---

## 📊 DADOS DO ORÇAMENTO (LOA 2025)

### Valores Globais

- **Receita Total:** R$ 4,392 trilhões
- **Despesa Total Autorizada:** R$ 1,900 trilhão
- **Superávit Primário:** R$ 2,192 trilhões
- **Teto de Gastos:** R$ 1,900 trilhão (constitucional)

### Orçamento por Ministério

| Ministério | Orçamento Total |
|------------|-----------------|
| Casa Civil | R$ 15 bilhões |
| Economia e Trabalho | R$ 250 bilhões |
| Saúde | R$ 200 bilhões |
| Educação, Ciência e Tecnologia | R$ 260 bilhões |
| Cultura e Esporte | R$ 45 bilhões |
| Defesa | R$ 150 bilhões |
| Justiça e Segurança Pública | R$ 120 bilhões |
| Infraestrutura | R$ 300 bilhões |
| Agricultura e Meio Ambiente | R$ 130 bilhões |
| Cidadania e Desenvolvimento Social | R$ 250 bilhões |
| Advocacia-Geral da União | R$ 30 bilhões |
| Gabinete da Presidência | R$ 150 bilhões |
| **TOTAL** | **R$ 1,900 trilhão** |

---

## 🌐 URLs DO SISTEMA

### Google Sites (Frontend)
- **URL:** [A DEFINIR após publicação]
- **Páginas:**
  - `/login` - Tela de autenticação
  - `/dashboard` - Dashboard principal
  - `/submit` - Submissão de propostas
  - `/admin` - Painel administrativo
  - `/extract` - Extrato orçamentário

### Google Sheets (Banco de Dados)
- **Planilha:** "Sistema Orçamentário Governo Chocotone"
- **URL:** https://docs.google.com/spreadsheets/d/13nGCARRd1IaRSIQiGYw8l7wWVOZJw6pdXie62fFxSR8/edit
- **Abas:**
  - Propostas
  - Orçamentos
  - Histórico
  - Configurações

### Google Apps Script (Backend API)
- **URL:** https://script.google.com/macros/s/AKfycbz-gPC5CKQSlVqfVPsWAtKaA8hD7mnRxJz-pkztNClXjPb-gXM-2lwTdQfNbLvnqK68Vw/exec
- **Status:** ✅ ATIVO E CONFIGURADO

### APIs Externas

**Indicadores Econômicos:**
- **URL:** https://congressohb.com.br/api/economic-ai/indicators?period=hour
- **Atualização:** A cada 1 hora (automático)
- **Fallback:** Botão manual de atualização

**Análise Constitucional (NotebookLM):**
- **URL:** https://notebooklm.google.com/notebook/68793eb3-1c33-41f5-a0b8-c2d54e7c4cb9
- **Uso:** Análise antes de submeter propostas

---

## 🔒 POLÍTICA DE SEGURANÇA

### Regras de Acesso

1. ✅ **Presidenta e Vice:** Acesso total ao painel administrativo
2. ✅ **Ministros:** Podem submeter propostas do seu ministério
3. ❌ **Ministros:** NÃO podem aprovar/rejeitar propostas
4. ❌ **Ministros:** NÃO podem ajustar orçamentos manualmente
5. ✅ **Todos:** Podem visualizar o dashboard e extrato

### Recomendações de Segurança

- 🔐 Não compartilhe sua senha com terceiros
- 🔄 Altere senhas periodicamente (a cada 90 dias)
- 🚫 Não anote senhas em locais visíveis
- 📱 Faça logout ao sair do sistema
- 🔍 Revise o histórico regularmente
- 💾 Faça backups da planilha semanalmente

### Alteração de Senhas

**Para alterar as senhas:**
1. Edite o arquivo `login.html`
2. Localize o objeto `PASSWORDS`
3. Altere os valores desejados
4. Republique no Google Sites
5. Notifique os usuários afetados

```javascript
const PASSWORDS = {
    presidenta: 'NOVA_SENHA_PRESIDENTA',
    vice: 'NOVA_SENHA_VICE',
    ministros: 'NOVA_SENHA_MINISTROS'
};
```

---

## 📞 CONTATOS DE EMERGÊNCIA

### Suporte Técnico
- **Desenvolvedor:** [A DEFINIR]
- **E-mail:** [A DEFINIR]
- **Telefone:** [A DEFINIR]

### Administradores do Sistema
- **Presidenta Chocotone**
- **Vice-Presidente Bryan dos Ouros**

### Em Caso de Problemas Críticos

1. **Sistema fora do ar:**
   - Verifique status do Google Sites
   - Verifique se a planilha está acessível
   - Entre em contato com suporte técnico

2. **Dados perdidos:**
   - Restaure backup mais recente
   - Verifique histórico da planilha (Arquivo > Histórico de versões)

3. **Acesso não autorizado:**
   - Altere todas as senhas imediatamente
   - Revise o histórico de operações
   - Exporte dados para análise forense

---

## 📋 CHECKLIST DE ATIVAÇÃO

Antes de liberar o sistema para uso geral:

- [x] Planilha Google Sheets criada e configurada
- [x] Google Apps Script implantado e testado
- [x] Função `initializeSheets()` executada com sucesso
- [x] URL do Apps Script atualizada em todos os HTMLs
- [ ] Páginas publicadas no Google Sites
- [ ] Teste de login com as 3 senhas
- [ ] Teste de submissão de proposta
- [ ] Teste de aprovação/rejeição
- [ ] Teste de atualização de orçamento
- [ ] Teste de extrato e filtros
- [ ] Backup inicial realizado
- [ ] Documentação distribuída para os usuários
- [ ] Treinamento realizado com Presidência
- [ ] Treinamento realizado com Ministros

---

## 📅 LOG DE ATIVIDADES

### 07/11/2025
- ✅ Sistema desenvolvido e testado
- ✅ Documentação completa criada
- ✅ Senhas definidas
- ✅ Pronto para deploy

### [DATA] - Deploy Inicial
- [ ] Google Sheets criado
- [ ] Apps Script implantado
- [ ] Google Sites publicado
- [ ] URLs atualizadas
- [ ] Sistema em produção

---

## 🎓 GUIA RÁPIDO DE USO

### Para Ministros

1. **Login:** Acesse o sistema, escolha seu nome, senha `Ministro2025@`
2. **Dashboard:** Veja seu orçamento disponível
3. **Submeter:** Clique em "Submeter Proposta"
4. **Preencher:** Complete todos os campos obrigatórios
5. **Analisar:** Use NotebookLM para verificar constitucionalidade
6. **Confirmar:** Marque checkbox e envie
7. **Aguardar:** Presidência aprovará/rejeitará

### Para Presidência

1. **Login:** Use sua senha específica
2. **Admin:** Acesse painel administrativo
3. **Revisar:** Veja propostas pendentes
4. **Decidir:** Aprovar/Rejeitar/Solicitar Ajustes
5. **Monitorar:** Acompanhe o extrato e orçamento

---

## 📊 MÉTRICAS E INDICADORES

### KPIs do Sistema

- **Tempo médio de aprovação:** [A CALCULAR]
- **Taxa de aprovação:** [A CALCULAR]
- **Execução orçamentária:** 0% (inicial)
- **Propostas por ministério:** [A CALCULAR]
- **Economia gerada:** [A CALCULAR]

### Alertas Automáticos

- ⚠️ 75% do teto: Alerta amarelo
- ⚠️ 90% do teto: Alerta laranja
- 🚨 95%+ do teto: Alerta vermelho (crítico)
- 🚨 100%+ do teto: Bloqueio de novas propostas

---

**DOCUMENTO ATUALIZADO EM:** 07/11/2025  
**VERSÃO:** 1.0  
**CLASSIFICAÇÃO:** 🔴 CONFIDENCIAL

⚠️ **ESTE DOCUMENTO CONTÉM INFORMAÇÕES SENSÍVEIS. MANTENHA EM LOCAL SEGURO.**
