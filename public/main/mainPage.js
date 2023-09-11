// /**
//  * 현재 윈도우 크기 구하는 함수
//  * @returns {string} 현재 윈도우 종류
//  */
// const getSize = () => {
//     const innerWidth = window.innerWidth;

//     if (innerWidth < 390) {
//         return 'phone';
//     } else if (innerWidth < 820) {
//         return 'pad';
//     } else {
//         return 'desktop';
//     }
// };
(async () => {
    const result = await axios({
        method: 'POST',
        url: `/`,
    });
    
    let HTML = ``;
    result.data.randomAlcoholList.forEach((item) => {
        HTML += `
        <div>
            <a href="/alcohol-list/detail/${item.id}">
                <img
                    class="thumbsnail"
                    src="https://img.etoday.co.kr/pto_db/2016/06/20160624045430_893102_992_829.jpg"
                />
                <p class="text_title">${item.name}</p>
                <p class="info">${item.info}</p>
            </a>
        </div>
        `;
    });
    document.querySelector('#randomCocktail').innerHTML = HTML;
})();
