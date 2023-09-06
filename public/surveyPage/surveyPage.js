// eventListner 설정을 위한 코드
(() => {
    document.querySelectorAll('input[type="radio"]').forEach((radio) => {
        radio.addEventListener('click', () => {
            const radioParentDiv = radio.parentNode.parentNode;
            radioParentDiv.style.display = 'none';
        });
    });
})();

document.querySelector('button').addEventListener('click', async () => {
    const userId = localStorage.getItem('loginToken');
    const checkedRadiosValue = [];

    document.querySelectorAll('input[type="radio"]').forEach((radio) => {
        if (radio.checked) {
            checkedRadiosValue.push(radio.value);
        }
    });

    if (userId) {
        AxiosForStoreSurveyResult(userId, checkedRadiosValue);
    } else {
        AxiosForStoreSurveyResult('anonymous', checkedRadiosValue);
    }
});

/**
 * login user는 설문 결과 db, localstorage 저장 및 페이지 이동 / anonymous user는 설문 결과 localstorage 저장 및 페이지 이동
 * @param {*} userId
 * @param {*} checkedRadiosValue
 */
const AxiosForStoreSurveyResult = async (userId, checkedRadiosValue) => {
    const res = await axios({
        method: 'POST',
        url: '/survey/result',
        data: {
            userId: userId,
            checkedRadiosValue,
        },
    });

    if (res.data.result) {
        localStorage.setItem('surveyResult', JSON.stringify(res.data.scores));
        window.location.replace('/survey/result');
    }
};
