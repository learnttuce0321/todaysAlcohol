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

/**
 * 추천받은 mainAlcohol DOM객체 생성
 * @param {object} item recommendedMainAlcohol
 */
const recommendedAlcoholMainItem = (item) => {
    const mainSection = document.querySelector('.mainRecommendedAlcohol');

    console.log(item);
    const div = document.createElement('div');
    div.innerHTML = `
            <div class="main__alcohol">
				<div>
					<img
						src="https://todaysalcohols3.s3.ap-northeast-2.amazonaws.com/${item.id}.jpg"
					/>
				</div>
				<div class="main__alcohol__info">
					<div class="name">
						<div>${item.name}</div>

						<div>${item.info}</div>
						<div class="abv">도수: ${item.abv}도</div>
					</div>
                    <button type="button" class="detailBtn" onclick="clickedDetailBtn(${item.id})"><i class="fa-solid fa-angles-right"></i></button>
				</div>
			</div>
        
    `;
    mainSection.appendChild(div);
};
/**
 * 추천받은 subAlcohols DOM객체 생성
 * @param {object[]} subAlcoholList recommendedSubalcoholList
 */
const recommemdedAlcoholSubItem = (subAlcoholList) => {
    const subSection = document.querySelector('.subRecommendedAlcohol');

    // const div = document.createElement('div');
    const subAlcoholSection = document.querySelector('.subRecommendedAlcohol');
    subAlcoholSection.innerHTML = `
        <div class="subCocktail__item">
            <a href="/alcohol-list/detail/${subAlcoholList[0].id}">
                <img
                    class="thumbsnail"
                    src="https://todaysalcohols3.s3.ap-northeast-2.amazonaws.com/${subAlcoholList[0].id}.jpg"
                />
                <p class="text_title">${subAlcoholList[0].name}</p>
                <p class="info">${subAlcoholList[0].info}</p>
            </a>
        </div>
        <div class="subCocktail__item">
            <a href="/alcohol-list/detail/${subAlcoholList[1].id}">
                <img
                    class="thumbsnail"
                    src="https://todaysalcohols3.s3.ap-northeast-2.amazonaws.com/${subAlcoholList[1].id}.jpg"
                />
                <p class="text_title">${subAlcoholList[1].name}</p>
                <p class="info">${subAlcoholList[1].info}</p>
            </a>
        </div>
        <div class="subCocktail__item">
            <a href="/alcohol-list/detail/${subAlcoholList[2].id}">
                <img
                    class="thumbsnail"
                    src="https://todaysalcohols3.s3.ap-northeast-2.amazonaws.com/${subAlcoholList[2].id}.jpg"
                />
                <p class="text_title">${subAlcoholList[2].name}</p>
                <p class="info">${subAlcoholList[2].info}</p>
            </a>
        </div>
    `;
};

const clickedDetailBtn = (id) => {
    window.location.href = `/alcohol-list/detail/${id}`;
};
