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
    document.querySelector('#randomCocktail').innerHTML = HTML;
})();

document.querySelector('#goAlcoholList').addEventListener('click', () => {
    window.location.href = '/alcohol-list';
});
