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
        <div class="randomCocktail__item">
            <a href="/alcohol-list/detail/${item.id}">
                <img
                    class="thumbsnail"
                    src="https://todaysalcohols3.s3.ap-northeast-2.amazonaws.com/${item.id}.jpg"
                />
                <p class="text_title">${item.name}</p>
                <p class="info">${item.info}</p>
            </a>
        </div>
        `;
    });
    // HTML += `
    //     <div class="randomCocktail__item">
    //         <a href="">
    //             <img
    //                 class="hidden"
    //                 src=""
    //             />
    //             <p class="text_title"></p>
    //             <p class="info"></p>
    //         </a>
    //     </div>
    //     <div class="randomCocktail__item">
    //         <a href="">
    //             <img
    //                 class="hidden"
    //                 src=""
    //             />
    //             <p class="text_title"></p>
    //             <p class="info"></p>
    //         </a>
    //     </div>
    //     <div class="randomCocktail__item">
    //         <a href="">
    //             <img
    //                 class="hidden"
    //                 src=""
    //             />
    //             <p class="text_title"></p>
    //             <p class="info"></p>
    //         </a>
    //     </div>
    //     `;
    document.querySelector('#randomCocktail').innerHTML = HTML;
})();
