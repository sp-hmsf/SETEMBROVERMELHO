/**
 * Google Apps Script para receber as respostas do formulário.
 *
 * 1) Crie uma planilha no Google Sheets.
 * 2) Extensões > Apps Script.
 * 3) Cole este código.
 * 4) Troque "Respostas" se quiser outro nome de aba.
 * 5) Implantar > Nova implantação > Aplicativo da Web.
 * 6) Executar como: você.
 * 7) Quem pode acessar: qualquer pessoa com o link (conforme política da sua instituição).
 * 8) Copie a URL /exec e cole em SHEETS_ENDPOINT no arquivo index.html.
 */

const SHEET_NAME = 'Respostas';

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Data/Hora',
      'Frituras/salgadinhos',
      'Embutidos',
      'Bebidas açucaradas',
      'Poucas frutas/verduras/legumes',
      'Ultraprocessados',
      'Pontuação',
      'Classificação'
    ]);
    sheet.setFrozenRows(1);
  }

  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.q1,
    data.q2,
    data.q3,
    data.q4,
    data.q5,
    data.score,
    data.classificacao
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ok:true}))
    .setMimeType(ContentService.MimeType.JSON);
}
