let selectedABVScore = '';
let selectedTasteScore = '';
// 모달 창 열기 위한 함수
function openModal() {
	const modal = document.getElementById('modal');

	const container = document.getElementById('container');
	const total_height = container.scrollHeight;

	modal.style.cssText = `display: flex; height: ${total_height}px `;
}

// 클릭 시 모달 창 열기
const btnModal = document.getElementById('filterBtnModal');
btnModal.addEventListener('click', openModal);

// X 클릭 시 모달 창 닫기
const closeBtn = document.querySelector('.close-area');
closeBtn.addEventListener('click', (e) => {
	const modal = document.getElementById('modal');
	modal.style.display = 'none';
});

// 폼 제출 처리 함수
function handleFormSubmission(e) {
	e.preventDefault();
	// 두 개의 버튼 다 선택 안할시 return
	if (!selectedABVScore || !selectedTasteScore) {
		alert('버튼을 눌러 점수를 골라주세요!!(점수 중복 선택 가능)');
		return;
	}

	// queryParams로 URL 생성
	const queryParams = `?abvScores=${selectedABVScore}&tasteScores=${selectedTasteScore}`;

	// 필터링 값으로 페이지를 바꿔줌
	window.location.href = `/alcohol-list/filteredResults${queryParams}`;
}

document
	.getElementById('filterForm')
	.addEventListener('submit', handleFormSubmission);

// 버튼 클릭 처리 함수
function handleRatingButtonClick(e) {
	const button = e.currentTarget;
	const dataValue = button.getAttribute('data-value');
	const ratingType = button.parentElement.id;

	if (ratingType === 'abvRatingButtons') {
		selectedABVScore = addToSelectedValues(selectedABVScore, dataValue);
	} else if (ratingType === 'tasteRatingButtons') {
		selectedTasteScore = addToSelectedValues(selectedTasteScore, dataValue);
	}

	button.classList.toggle('selected-button');
}

// 평가 버튼에 이벤트 리스너 추가
const ratingButtons = document.querySelectorAll('.rating-button');
ratingButtons.forEach((button) => {
	button.addEventListener('click', handleRatingButtonClick);
});

// 선택한 button 값 추가
function addToSelectedValues(selectedValues, newValue) {
	if (!selectedValues) {
		return newValue;
	}
	return selectedValues.includes(newValue)
		? selectedValues.replace(`${newValue},`, '').replace(`${newValue}`, '')
		: `${selectedValues},${newValue}`;
}
