(async () => {
    const userId = localStorage.getItem('loginToken');
    const calculatedScore = JSON.parse(localStorage.getItem('surveyResult'));
    localStorage.removeItem('surveyResult');

    if (!userId) {
        if (!calculatedScore) {
            alert('로그인 후 이용해 주세요');
            window.location.replace('/login');
        } else {
            const result = await axios({
                method: 'POST',
                url: '/survey/result/user',
                data: {
                    calculatedScore,
                },
            });

            if (result.data.result) {
                document.querySelector('.loading').style.display = 'none';
                recommendedAlcoholMainItem(result.data.alcoholList.mainAlcohol);
                recommemdedAlcoholSubItem(result.data.alcoholList.subAlcohol);
            }
        }
    } else {
        if (calculatedScore) {
            const result = await axios({
                method: 'POST',
                url: '/survey/result/user',
                data: {
                    calculatedScore,
                },
            });

            if (result.data.result) {
                document.querySelector('.loading').style.display = 'none';
                recommendedAlcoholMainItem(result.data.alcoholList.mainAlcohol);
                recommemdedAlcoholSubItem(result.data.alcoholList.subAlcohol);
            }
        } else {
            const recentData = await axios({
                method: `POST`,
                url: '/survey/result/recent',
                data: {
                    userId,
                },
            });

            if (recentData.data.result) {
                const result = await axios({
                    method: 'POST',
                    url: '/survey/result/user',
                    data: {
                        calculatedScore: [
                            recentData.data.score1,
                            recentData.data.score2,
                            recentData.data.score3,
                        ],
                    },
                });

                if (result.data.result) {
                    document.querySelector('.loading').style.display = 'none';
                    recommendedAlcoholMainItem(
                        result.data.alcoholList.mainAlcohol
                    );
                    recommemdedAlcoholSubItem(
                        result.data.alcoholList.subAlcohol
                    );
                }
            } else {
                alert('최근 결과 없음');
                window.location.replace('/survey');
            }
        }
    }
})();

const recommendedAlcoholMainItem = (item) => {
    const mainSection = document.querySelector('.mainRecommendedAlcohol');

    const div = document.createElement('div');
    div.innerHTML = `
        <h1>${item.name}</h1>
        <p>${item.info}</p>
        <a href="/alcohol-list/detail/${item.id}">알아보기</a>
    `;
    mainSection.appendChild(div);
};
const recommemdedAlcoholSubItem = (subAlcoholList) => {
    const subSection = document.querySelector('.subRecommendedAlcohol');

    const div = document.createElement('div');
    div.innerHTML = `
        <a href="/alcohol-list/detail/${subAlcoholList[0].id}">
            <h3>${subAlcoholList[0].name}</h3>
            <p>${subAlcoholList[0].info}</p>
        </a>

        <a href="/alcohol-list/detail/${subAlcoholList[1].id}">
            <h3>${subAlcoholList[1].name}</h3>
            <p>${subAlcoholList[1].info}</p>
        </a>

        <a href="/alcohol-list/detail/${subAlcoholList[2].id}">
            <h3>${subAlcoholList[2].name}</h3>
            <p>${subAlcoholList[2].info}</p>
        </a>
    `;
    subSection.appendChild(div);
};
