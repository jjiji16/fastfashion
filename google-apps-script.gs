/**
 * 웹사이트에서 POST 요청을 받아 Google Sheet에 데이터를 기록하는 함수입니다.
 * 이 코드는 Google Apps Script 편집기에 붙여넣고 웹 앱으로 배포해야 합니다.
 * 액세스 권한은 '모든 사용자'로 설정해야 합니다.
 */
function doPost(e) {
  // 응답을 기록할 Google Sheet ID 또는 URL (현재 스크립트가 연결된 시트)
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets()[0]; // 첫 번째 시트를 사용합니다.

  try {
    // 웹사이트에서 전송된 데이터 추출
    const data = e.parameter; 
    
    // 타임스탬프 생성
    const timestamp = new Date(); 
    
    // Sheets에 기록할 행 데이터 (Sheets의 헤더 순서와 일치해야 합니다: Timestamp, q1, q2, q3, q4, q5)
    const row = [
      timestamp, 
      data.q1, 
      data.q2, 
      data.q3, 
      data.q4, 
      data.q5
    ];

    // 시트의 마지막 행에 데이터 추가
    sheet.appendRow(row);

    // 성공 응답 반환
    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", message: "Data recorded successfully" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // 오류 응답 반환
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
