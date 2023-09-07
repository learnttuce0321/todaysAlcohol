(async () => {
    const likeBtn = document.querySelector('.likeBtn');
    const result = await axios({
        method: 'POST',
        url: `/alcohol-list/${
            window.location.pathname.split('/')[3]
        }/like/find`,
    });

    if (result.data.result) {
        likeBtn.value = 'disabled';
        likeBtn.style.backgroundColor = 'blue';
        likeBtn.style.color = 'white';
    }
})();

document.querySelector('.likeBtn').addEventListener('click', async (e) => {
    // e.preventDefault();
    const likeBtn = document.querySelector('.likeBtn');
    const loginToken = localStorage.getItem('loginToken');

    if (loginToken) {
        if (likeBtn.value === 'enabled') {
            likeBtn.value = 'disabled';
            const result = await axios({
                method: 'POST',
                url: `/alcohol-list/${
                    window.location.pathname.split('/')[3]
                }/like`,
            });

            if (result.data.result) {
                likeBtn.style.backgroundColor = 'blue';
                likeBtn.style.color = 'white';
            }
        } else {
            likeBtn.value = 'enabled';
            const result = await axios({
                method: 'POST',
                url: `/alcohol-list/${
                    window.location.pathname.split('/')[3]
                }/like/delete`,
            });

            if (result.data.result) {
                likeBtn.removeAttribute('style');
            }
        }
    } else {
        alert('로그인 후 사용 가능합니다.');
        window.location.href = '/login';
    }
});
