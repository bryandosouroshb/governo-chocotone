/**
 * GOOGLE APPS SCRIPT - SISTEMA ORÇAMENTÁRIO GOVERNO CHOCOTONE
 * 
 * INSTRUÇÕES DE CONFIGURAÇÃO:
 * 
 * 1. Crie uma nova planilha Google Sheets chamada "Sistema Orçamentário Governo Chocotone"
 * 
 * 2. Crie 4 abas (sheets) com os seguintes nomes:
 *    - Propostas
 *    - Orçamentos
 *    - Histórico
 *    - Configurações
 * 
 * 3. Abra Extensions > Apps Script
 * 
 * 4. Cole este código no editor
 * 
 * 5. Clique em Deploy > New deployment
 *    - Tipo: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Clique em Deploy
 * 
 * 6. Copie a URL gerada e cole no CONFIG.SHEETS_API_URL de todos os arquivos HTML
 * 
 * 7. Autorize o script quando solicitado
 */

// ============================================
// CONFIGURAÇÕES GLOBAIS
// ============================================

const SHEETS = {
  PROPOSALS: 'Propostas',
  BUDGETS: 'Orçamentos',
  HISTORY: 'Histórico',
  CONFIG: 'Configurações'
};

const MINISTRIES = [
  { name: 'Casa Civil', budget: 15000000000 },
  { name: 'Economia e Trabalho', budget: 250000000000 },
  { name: 'Saúde', budget: 200000000000 },
  { name: 'Educação, Ciência e Tecnologia', budget: 260000000000 },
  { name: 'Cultura e Esporte', budget: 45000000000 },
  { name: 'Defesa', budget: 150000000000 },
  { name: 'Justiça e Segurança Pública', budget: 120000000000 },
  { name: 'Infraestrutura', budget: 300000000000 },
  { name: 'Agricultura e Meio Ambiente', budget: 130000000000 },
  { name: 'Cidadania e Desenvolvimento Social', budget: 250000000000 },
  { name: 'Advocacia-Geral da União', budget: 30000000000 },
  { name: 'Gabinete da Presidência', budget: 150000000000 }
];

// ============================================
// CONFIGURAÇÃO DA PLANILHA
// ============================================

// COLE AQUI O ID DA SUA PLANILHA (pegue da URL depois do /d/)
// Exemplo: https://docs.google.com/spreadsheets/d/ABC123XYZ/edit
// O ID seria: ABC123XYZ
const SPREADSHEET_ID = '13nGCARRd1IaRSIQiGYw8l7wWVOZJw6pdXie62fFxSR8';

// ============================================
// INICIALIZAÇÃO DO SISTEMA
// ============================================

function initializeSheets() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  
  // Criar aba de Propostas
  let proposalsSheet = ss.getSheetByName(SHEETS.PROPOSALS);
  if (!proposalsSheet) {
    proposalsSheet = ss.insertSheet(SHEETS.PROPOSALS);
  }
  proposalsSheet.clear();
  proposalsSheet.appendRow([
    'ID',
    'Data Submissão',
    'Solicitante',
    'Cargo',
    'Ministério',
    'Tipo Documento',
    'Ementa',
    'Corpo',
    'Justificativa',
    'Custo Estimado',
    'Status',
    'Data Aprovação/Rejeição',
    'Aprovado Por',
    'Observações'
  ]);
  proposalsSheet.getRange(1, 1, 1, 14).setFontWeight('bold').setBackground('#667eea').setFontColor('#ffffff');
  
  // Criar aba de Orçamentos
  let budgetsSheet = ss.getSheetByName(SHEETS.BUDGETS);
  if (!budgetsSheet) {
    budgetsSheet = ss.insertSheet(SHEETS.BUDGETS);
  }
  budgetsSheet.clear();
  budgetsSheet.appendRow([
    'Ministério',
    'Orçamento Total',
    'Gasto Acumulado',
    'Disponível',
    '% Executado',
    'Última Atualização'
  ]);
  budgetsSheet.getRange(1, 1, 1, 6).setFontWeight('bold').setBackground('#667eea').setFontColor('#ffffff');
  
  // Inicializar orçamentos
  MINISTRIES.forEach(ministry => {
    budgetsSheet.appendRow([
      ministry.name,
      ministry.budget,
      0,
      ministry.budget,
      0,
      new Date()
    ]);
  });
  
  // Criar aba de Histórico
  let historySheet = ss.getSheetByName(SHEETS.HISTORY);
  if (!historySheet) {
    historySheet = ss.insertSheet(SHEETS.HISTORY);
  }
  historySheet.clear();
  historySheet.appendRow([
    'ID',
    'Data',
    'Tipo Operação',
    'Usuário',
    'Detalhes',
    'Valor'
  ]);
  historySheet.getRange(1, 1, 1, 6).setFontWeight('bold').setBackground('#667eea').setFontColor('#ffffff');
  
  // Criar aba de Configurações
  let configSheet = ss.getSheetByName(SHEETS.CONFIG);
  if (!configSheet) {
    configSheet = ss.insertSheet(SHEETS.CONFIG);
  }
  configSheet.clear();
  configSheet.appendRow(['Chave', 'Valor']);
  configSheet.getRange(1, 1, 1, 2).setFontWeight('bold').setBackground('#667eea').setFontColor('#ffffff');
  configSheet.appendRow(['Teto de Gastos', 1900000000000]);
  configSheet.appendRow(['Receita Total', 4392000000000]);
  configSheet.appendRow(['Última Atualização', new Date()]);
  
  return ContentService.createTextOutput('Sistema inicializado com sucesso!');
}

// ============================================
// ENDPOINTS HTTP (GET E POST)
// ============================================

function doGet(e) {
  try {
    const action = e.parameter.action;
    
    switch(action) {
      case 'getProposals':
        return getProposals(e.parameter.status);
      case 'getBudgets':
        return getBudgets();
      case 'getHistory':
        return getHistory();
      case 'getStats':
        return getStats();
      default:
        return createResponse({ error: 'Ação não especificada' }, 400);
    }
  } catch (error) {
    return createResponse({ error: error.toString() }, 500);
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    switch(action) {
      case 'submitProposal':
        return submitProposal(data);
      case 'approveProposal':
        return approveProposal(data);
      case 'rejectProposal':
        return rejectProposal(data);
      case 'adjustProposal':
        return adjustProposal(data);
      case 'updateBudget':
        return updateBudget(data);
      default:
        return createResponse({ error: 'Ação não especificada' }, 400);
    }
  } catch (error) {
    return createResponse({ error: error.toString() }, 500);
  }
}

// ============================================
// FUNÇÕES DE PROPOSTAS
// ============================================

function submitProposal(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const proposalsSheet = ss.getSheetByName(SHEETS.PROPOSALS);
  
  // Gerar ID único
  const id = 'PROP-' + new Date().getTime();
  
  // Validar orçamento disponível
  const ministry = getMinistryFromPosition(data.position);
  const budgetInfo = getMinistryBudget(ministry);
  
  if (data.estimatedCost > budgetInfo.available) {
    return createResponse({ 
      success: false, 
      error: 'Orçamento insuficiente',
      available: budgetInfo.available
    }, 400);
  }
  
  // Adicionar proposta
  proposalsSheet.appendRow([
    id,
    new Date(),
    data.requestorName,
    data.position,
    ministry,
    data.documentType,
    data.summary,
    data.body,
    data.justification,
    data.estimatedCost,
    'pending',
    '',
    '',
    ''
  ]);
  
  // Registrar no histórico
  logHistory(id, 'Submissão de Proposta', data.requestorName, data.summary, data.estimatedCost);
  
  return createResponse({ 
    success: true, 
    id: id,
    message: 'Proposta enviada com sucesso!'
  });
}

function approveProposal(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const proposalsSheet = ss.getSheetByName(SHEETS.PROPOSALS);
  
  // Encontrar proposta
  const dataRange = proposalsSheet.getDataRange().getValues();
  let rowIndex = -1;
  let proposal = null;
  
  for (let i = 1; i < dataRange.length; i++) {
    if (dataRange[i][0] === data.proposalId) {
      rowIndex = i + 1;
      proposal = dataRange[i];
      break;
    }
  }
  
  if (rowIndex === -1) {
    return createResponse({ success: false, error: 'Proposta não encontrada' }, 404);
  }
  
  // Atualizar status
  proposalsSheet.getRange(rowIndex, 11).setValue('approved');
  proposalsSheet.getRange(rowIndex, 12).setValue(new Date());
  proposalsSheet.getRange(rowIndex, 13).setValue(data.approvedBy);
  proposalsSheet.getRange(rowIndex, 14).setValue(data.notes || '');
  
  // Atualizar orçamento
  const ministry = proposal[4];
  const cost = proposal[9];
  updateMinistryBudget(ministry, cost);
  
  // Registrar no histórico
  logHistory(data.proposalId, 'Aprovação de Proposta', data.approvedBy, `Aprovada: ${proposal[6]}`, cost);
  
  return createResponse({ 
    success: true, 
    message: 'Proposta aprovada com sucesso!'
  });
}

function rejectProposal(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const proposalsSheet = ss.getSheetByName(SHEETS.PROPOSALS);
  
  // Encontrar proposta
  const dataRange = proposalsSheet.getDataRange().getValues();
  let rowIndex = -1;
  let proposal = null;
  
  for (let i = 1; i < dataRange.length; i++) {
    if (dataRange[i][0] === data.proposalId) {
      rowIndex = i + 1;
      proposal = dataRange[i];
      break;
    }
  }
  
  if (rowIndex === -1) {
    return createResponse({ success: false, error: 'Proposta não encontrada' }, 404);
  }
  
  // Atualizar status
  proposalsSheet.getRange(rowIndex, 11).setValue('rejected');
  proposalsSheet.getRange(rowIndex, 12).setValue(new Date());
  proposalsSheet.getRange(rowIndex, 13).setValue(data.rejectedBy);
  proposalsSheet.getRange(rowIndex, 14).setValue(data.reason);
  
  // Registrar no histórico
  logHistory(data.proposalId, 'Rejeição de Proposta', data.rejectedBy, `Rejeitada: ${proposal[6]}`, 0);
  
  return createResponse({ 
    success: true, 
    message: 'Proposta rejeitada!'
  });
}

function adjustProposal(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const proposalsSheet = ss.getSheetByName(SHEETS.PROPOSALS);
  
  // Encontrar proposta
  const dataRange = proposalsSheet.getDataRange().getValues();
  let rowIndex = -1;
  let proposal = null;
  
  for (let i = 1; i < dataRange.length; i++) {
    if (dataRange[i][0] === data.proposalId) {
      rowIndex = i + 1;
      proposal = dataRange[i];
      break;
    }
  }
  
  if (rowIndex === -1) {
    return createResponse({ success: false, error: 'Proposta não encontrada' }, 404);
  }
  
  // Atualizar status
  proposalsSheet.getRange(rowIndex, 11).setValue('adjustments_requested');
  proposalsSheet.getRange(rowIndex, 14).setValue(data.adjustments);
  
  // Registrar no histórico
  logHistory(data.proposalId, 'Solicitação de Ajustes', data.requestedBy, `Ajustes: ${proposal[6]}`, 0);
  
  return createResponse({ 
    success: true, 
    message: 'Ajustes solicitados!'
  });
}

// ============================================
// FUNÇÕES DE ORÇAMENTO
// ============================================

function getBudgets() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const budgetsSheet = ss.getSheetByName(SHEETS.BUDGETS);
  const dataRange = budgetsSheet.getDataRange().getValues();
  
  const budgets = [];
  for (let i = 1; i < dataRange.length; i++) {
    budgets.push({
      ministry: dataRange[i][0],
      total: dataRange[i][1],
      spent: dataRange[i][2],
      available: dataRange[i][3],
      percentExecuted: dataRange[i][4],
      lastUpdate: dataRange[i][5]
    });
  }
  
  return createResponse({ budgets: budgets });
}

function getMinistryBudget(ministryName) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const budgetsSheet = ss.getSheetByName(SHEETS.BUDGETS);
  const dataRange = budgetsSheet.getDataRange().getValues();
  
  for (let i = 1; i < dataRange.length; i++) {
    if (dataRange[i][0] === ministryName) {
      return {
        total: dataRange[i][1],
        spent: dataRange[i][2],
        available: dataRange[i][3],
        percentExecuted: dataRange[i][4]
      };
    }
  }
  
  return null;
}

function updateMinistryBudget(ministryName, amount) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const budgetsSheet = ss.getSheetByName(SHEETS.BUDGETS);
  const dataRange = budgetsSheet.getDataRange().getValues();
  
  for (let i = 1; i < dataRange.length; i++) {
    if (dataRange[i][0] === ministryName) {
      const rowIndex = i + 1;
      const total = dataRange[i][1];
      const currentSpent = dataRange[i][2];
      const newSpent = currentSpent + amount;
      const newAvailable = total - newSpent;
      const newPercent = (newSpent / total) * 100;
      
      budgetsSheet.getRange(rowIndex, 3).setValue(newSpent);
      budgetsSheet.getRange(rowIndex, 4).setValue(newAvailable);
      budgetsSheet.getRange(rowIndex, 5).setValue(newPercent);
      budgetsSheet.getRange(rowIndex, 6).setValue(new Date());
      
      return true;
    }
  }
  
  return false;
}

function updateBudget(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const budgetsSheet = ss.getSheetByName(SHEETS.BUDGETS);
  const dataRange = budgetsSheet.getDataRange().getValues();
  
  for (let i = 1; i < dataRange.length; i++) {
    if (dataRange[i][0] === data.ministry) {
      const rowIndex = i + 1;
      const newTotal = data.newBudget;
      const currentSpent = dataRange[i][2];
      const newAvailable = newTotal - currentSpent;
      const newPercent = (currentSpent / newTotal) * 100;
      
      budgetsSheet.getRange(rowIndex, 2).setValue(newTotal);
      budgetsSheet.getRange(rowIndex, 4).setValue(newAvailable);
      budgetsSheet.getRange(rowIndex, 5).setValue(newPercent);
      budgetsSheet.getRange(rowIndex, 6).setValue(new Date());
      
      logHistory('BUDGET-ADJ', 'Ajuste Manual de Orçamento', data.adjustedBy, `${data.ministry}: ${newTotal}`, 0);
      
      return createResponse({ 
        success: true, 
        message: 'Orçamento atualizado!'
      });
    }
  }
  
  return createResponse({ success: false, error: 'Ministério não encontrado' }, 404);
}

// ============================================
// FUNÇÕES DE CONSULTA
// ============================================

function getProposals(status) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const proposalsSheet = ss.getSheetByName(SHEETS.PROPOSALS);
  const dataRange = proposalsSheet.getDataRange().getValues();
  
  const proposals = [];
  for (let i = 1; i < dataRange.length; i++) {
    if (!status || dataRange[i][10] === status) {
      proposals.push({
        id: dataRange[i][0],
        submittedAt: dataRange[i][1],
        requestorName: dataRange[i][2],
        position: dataRange[i][3],
        ministry: dataRange[i][4],
        documentType: dataRange[i][5],
        summary: dataRange[i][6],
        body: dataRange[i][7],
        justification: dataRange[i][8],
        estimatedCost: dataRange[i][9],
        status: dataRange[i][10],
        processedAt: dataRange[i][11],
        processedBy: dataRange[i][12],
        notes: dataRange[i][13]
      });
    }
  }
  
  return createResponse({ proposals: proposals });
}

function getHistory() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const historySheet = ss.getSheetByName(SHEETS.HISTORY);
  const dataRange = historySheet.getDataRange().getValues();
  
  const history = [];
  for (let i = 1; i < dataRange.length; i++) {
    history.push({
      id: dataRange[i][0],
      date: dataRange[i][1],
      operation: dataRange[i][2],
      user: dataRange[i][3],
      details: dataRange[i][4],
      value: dataRange[i][5]
    });
  }
  
  return createResponse({ history: history });
}

function getStats() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const budgetsSheet = ss.getSheetByName(SHEETS.BUDGETS);
  const dataRange = budgetsSheet.getDataRange().getValues();
  
  let totalBudget = 0;
  let totalSpent = 0;
  
  for (let i = 1; i < dataRange.length; i++) {
    totalBudget += dataRange[i][1];
    totalSpent += dataRange[i][2];
  }
  
  const proposalsSheet = ss.getSheetByName(SHEETS.PROPOSALS);
  const proposalsData = proposalsSheet.getDataRange().getValues();
  
  let pendingCount = 0;
  let approvedCount = 0;
  let rejectedCount = 0;
  
  for (let i = 1; i < proposalsData.length; i++) {
    const status = proposalsData[i][10];
    if (status === 'pending') pendingCount++;
    else if (status === 'approved') approvedCount++;
    else if (status === 'rejected') rejectedCount++;
  }
  
  return createResponse({
    totalBudget: totalBudget,
    totalSpent: totalSpent,
    totalAvailable: totalBudget - totalSpent,
    percentExecuted: (totalSpent / totalBudget) * 100,
    pendingProposals: pendingCount,
    approvedProposals: approvedCount,
    rejectedProposals: rejectedCount
  });
}

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

function logHistory(id, operation, user, details, value) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const historySheet = ss.getSheetByName(SHEETS.HISTORY);
  
  historySheet.appendRow([
    id,
    new Date(),
    operation,
    user,
    details,
    value
  ]);
}

function getMinistryFromPosition(position) {
  const mapping = {
    'Casa Civil': 'Casa Civil',
    'Economia': 'Economia e Trabalho',
    'Saúde': 'Saúde',
    'Educação': 'Educação, Ciência e Tecnologia',
    'Cultura': 'Cultura e Esporte',
    'Defesa': 'Defesa',
    'Justiça': 'Justiça e Segurança Pública',
    'Infraestrutura': 'Infraestrutura',
    'Agricultura': 'Agricultura e Meio Ambiente',
    'Cidadania': 'Cidadania e Desenvolvimento Social',
    'Advocacia': 'Advocacia-Geral da União',
    'Gabinete': 'Gabinete da Presidência',
    'Presidenta': 'Gabinete da Presidência',
    'Vice': 'Gabinete da Presidência'
  };
  
  for (const key in mapping) {
    if (position.includes(key)) {
      return mapping[key];
    }
  }
  
  return 'Gabinete da Presidência';
}

function createResponse(data, status = 200) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================
// FUNÇÕES DE TESTE (EXECUTAR MANUALMENTE)
// ============================================

function testSubmitProposal() {
  const testData = {
    action: 'submitProposal',
    requestorName: 'Lucca',
    position: 'Ministro da Economia e Trabalho',
    documentType: 'Portaria',
    summary: 'Teste de Submissão',
    body: 'Corpo do documento de teste',
    justification: 'Justificativa de teste',
    estimatedCost: 1000000
  };
  
  Logger.log(submitProposal(testData).getContent());
}

function testGetBudgets() {
  Logger.log(getBudgets().getContent());
}

function testGetStats() {
  Logger.log(getStats().getContent());
}
