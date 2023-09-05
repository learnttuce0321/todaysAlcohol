(async () => {
    const userId = localStorage.getItem('loginToken');
    const calculatedScore = JSON.parse(localStorage.getItem('surveyResult'));
    localStorage.removeItem('surveyResult');

    if (!userId) {
        alert('금지');
        window.location.replace('/');
    } else if (userId) {
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
                recommendedAlcoholMainItem(result.data.alcoholList.mainAlcohol);
                recommemdedAlcoholSubItem(result.data.alcoholList.subAlcohol);
            }
        } else {
            alert('금지');
            window.location.replace('/');
        }
    } else {
        console.log(calculatedScore);
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
})();

const recommendedAlcoholMainItem = (item) => {
    const mainSection = document.querySelector('.mainRecommendedAlcohol');

    const div = document.createElement('div');
    div.innerHTML = `
        <h1>${item.name}</h1>
        <p>술 설명~~~~</p>
    `;
    mainSection.appendChild(div);
};
const recommemdedAlcoholSubItem = (subAlcoholList) => {
    const subSection = document.querySelector('.subRecommendedAlcohol');

    const div = document.createElement('div');
    div.innerHTML = `
        <h3>${subAlcoholList[0].name}</h3>
        <p>술 설명~~~~</p>

        <h3>${subAlcoholList[1].name}</h3>
        <p>술 설명~~~~</p>

        <h3>${subAlcoholList[2].name}</h3>
        <p>술 설명~~~~</p>
    `;
    subSection.appendChild(div);
};
