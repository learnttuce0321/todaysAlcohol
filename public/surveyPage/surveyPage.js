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

const setIndex = () => {
    let index = 0;

    return (op) => {
        if (op === '+') {
            if (index !== 8) {
                index++;
            }
        } else if (op === '-') {
            if (index !== 0) {
                index--;
            }
        }

        return index;
    };
};
const getIndex = setIndex();

(() => {
    document
        .querySelectorAll('.surveyCard')
        .forEach((item) => (item.style.display = 'none'));

    document.querySelector('.surveyCard').style.display = 'block';
    document.querySelector('.btn').style.visibility = 'hidden';
})();

(() => {
    document
        .querySelectorAll('input[type="radio"]')
        .forEach((item, index, list) => {
            item.addEventListener('click', () => {
                list.forEach((item) => {
                    item.parentNode.classList.remove('shadow');
                });
                item.parentNode.classList.add('shadow');
            });
        });
})();

document.querySelector('.beforeQuestionBtn').addEventListener('click', () => {
    const formDoms = document.querySelectorAll('form[name="Qform"]');

    const index = getIndex('-');

    document.querySelector('.btn').style.visibility = 'hidden';
    formDoms[index + 1].parentNode.style.display = 'none';
    formDoms[index].parentNode.style.display = 'block';
});

document.querySelector('.afterQuestionBtn').addEventListener('click', () => {
    const formDoms = document.querySelectorAll('form[name="Qform"]');
    const index = getIndex('+');

    if (index === 8) {
        document.querySelector('.btn').style.visibility = 'visible';
    }
    formDoms[index - 1].parentNode.style.display = 'none';
    formDoms[index].parentNode.style.display = 'block';
});

document.querySelector('.btn').addEventListener('click', () => {
    const userId = localStorage.getItem('loginToken');
    const checkedRadiosValue = [];

    document.querySelectorAll('input[type="radio"]').forEach((radio) => {
        if (radio.checked) {
            checkedRadiosValue.push(radio.value);
        }
    });

    if (checkedRadiosValue.length !== 9) {
        alert('누르지 않은 문항이 있습니다.');
    } else {
        if (userId) {
            AxiosForStoreSurveyResult(userId, checkedRadiosValue);
        } else {
            AxiosForStoreSurveyResult('anonymous', checkedRadiosValue);
        }
    }
});
