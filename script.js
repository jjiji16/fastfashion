// 🚨 [필수] 사용자 본인의 Google Forms URL과 차트 임베드 URL로 변경해야 합니다.
// 1. Google Form의 '제출 URL' (Form의 'action' 속성에서 추출)
const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/u/0/d/e/YOUR_FORM_KEY/formResponse'; 

// 2. Google Sheets에서 차트를 '웹에 게시'하여 얻은 임베드 URL
const CHART_EMBED_URL = 'https://docs.google.com/spreadsheets/d/e/YOUR_SHEET_KEY/pubchart?oid=YOUR_CHART_ID&amp;format=image'; 

// 🚨 [필수] Google Form 미리보기 페이지에서 확인한 각 질문의 고유 'entry.' ID로 변경해야 합니다.
const ENTRY_IDS = {
    // 예시 ID입니다. 실제 ID로 교체하세요!
    q1: 'entry.123456789', // 1.옷을 얼마나 구매하시나요?
    q2: 'entry.987654321', // 2.한 번 구매시 몇 벌을 구매하시나요?
    q3: 'entry.112233445', // 3.주로 어디서 구매하시나요?
    q4: 'entry.556677889', // 4.구매한 옷은 얼마나 오래 입나요?
    q5: 'entry.998877665'  // 5.패스트 패션에 대해 어느정도 알고계시나요?
};

document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // 폼 데이터 수집
    const formData = new FormData(this);
    const data = new URLSearchParams();
    
    // 폼 데이터의 키를 Google Forms의 엔트리 ID에 매핑
    formData.forEach((value, key) => {
        if (ENTRY_IDS[key]) {
            data.append(ENTRY_IDS[key], value);
        }
    });

    // Google Form 엔드포인트로 데이터 비동기 전송
    fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors', // CORS 문제 방지를 위해 'no-cors' 모드 사용
        body: data 
    })
    .then(() => {
        // 제출 성공 알림
        alert('제출되었습니다. 실시간 설문조사 결과 페이지로 이동합니다.');
        
        // 결과 페이지로 화면 전환
        showResultPage();
    })
    .catch(error => {
        console.error('Submission Error:', error);
        alert('제출 중 오류가 발생했습니다.');
    });
});

function showResultPage() {
    const container = document.querySelector('.container');
    
    // 결과 페이지 레이아웃 변경 (이전에 작성된 CSS 스타일 유지)
    container.innerHTML = `
        <h2>📊 설문조사 실시간 결과</h2>
        <p>Google Sheets에 수집된 데이터가 반영된 실시간 그래프입니다.</p>
        
        <div class="chart-area" style="margin-bottom: 40px;">
            <iframe 
                src="${CHART_EMBED_URL}"
                width="100%" 
                height="450" 
                frameborder="0" 
                scrolling="no" 
                style="border: 1px solid #ccc; border-radius: 8px;">
            </iframe>
        </div>
        
        <hr>
        
        <h2>📜 패스트 패션이란?</h2>
        <div class="fast-fashion-info">
            <p><strong>패스트 패션(Fast Fashion)</strong>은 최신 유행을 즉각 반영하여 빠르게 상품을 제작하고 유통하는 의류 산업의 비즈니스 모델입니다. 이 모델은 환경 오염, 노동 착취 등의 문제를 야기하며, 지속 가능한 소비에 대한 고민을 요구합니다.</p>
        </div>
    `;
    
    // 페이지를 맨 위로 스크롤하여 결과를 보여줍니다.
    window.scrollTo(0, 0);
}
