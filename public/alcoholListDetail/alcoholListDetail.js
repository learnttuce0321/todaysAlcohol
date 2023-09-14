// client 좋아요 눌렀는지 확인
(async () => {
    const likeBtn = document.querySelector('.likeBtn');
    const loginToken = localStorage.getItem('loginToken');
    const result = await axios({
        method: 'POST',
        url: `/alcohol-list/${
            window.location.pathname.split('/')[3]
        }/like/find`,
    });

    if (result.data.result && loginToken) {
        likeBtn.value = 'disabled';

        likeBtn.style.color = '#FF0060';
        likeBtn.style.border = '2px solid rgb(211 93 138)';
    }
})();

document.querySelector('.likeBtn').addEventListener('click', async (e) => {
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
                likeBtn.style.color = '#FF0060';
                likeBtn.style.border = '2px solid rgb(211 93 138)';
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
