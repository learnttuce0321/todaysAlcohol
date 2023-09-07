document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const abvScores = urlParams.get('abvScores');
    const tasteScores = urlParams.get('tasteScores');

    // filteredData 사용
    axios
        .get(
            `/alcohol-list/filteredResult?abvScore=${abvScores}&tasteScore=${tasteScores}`
        )
        .then((response) => {
            const filteredData = response.data;

            // 결과값을 ul태그로 출력
            const ulElement = document.querySelector('ul');
            filteredData.forEach((item) => {
                const liElement = document.createElement('li');
                liElement.textContent = item.name;
                ulElement.appendChild(liElement);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
