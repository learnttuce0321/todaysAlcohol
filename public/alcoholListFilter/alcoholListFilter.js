const modal = document.getElementById('modal');

// 클릭시 modal창 열리기
const btnModal = document.getElementById('filterBtnModal');
btnModal.addEventListener('click', (e) => {
    modal.style.display = 'flex';
});

// X 클릭시 modal 창 닫히기
const closeBtn = modal.querySelector('.close-area');
closeBtn.addEventListener('click', (e) => {
    modal.style.display = 'none';
});

// modal form 전송
document.getElementById('filterForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const abvScoresInput = document.getElementById('abvScores');
    const tasteScoresInput = document.getElementById('tasteScores');

    const abvScores = abvScoresInput.value.trim() || '1,2,3,4,5';
    const tasteScores = tasteScoresInput.value.trim() || '1,2,3,4,5';

    // input 값  ","로 분리
    const formattedAbvScores = abvScores.split(',').join(',');
    const formattedTasteScores = tasteScores.split(',').join(',');
    // URL 주소 param값에 넣음
    const queryParams = `?abvScores=${formattedAbvScores}&tasteScores=${formattedTasteScores}`;

    // URL 이동
    window.location.href = `/alcohol-list/filteredResults${queryParams}`;
});

document
    .getElementById('filterForm')
    .addEventListener('submit', handleFormSubmission);

window.addEventListener('load', () => {
    // input값이 비어있을 경우
    const abvScoresInput = document.getElementById('abvScores');
    const tasteScoresInput = document.getElementById('tasteScores');
    abvScoresInput.value = '1,2,3,4,5';
    tasteScoresInput.value = '1,2,3,4,5';
});
