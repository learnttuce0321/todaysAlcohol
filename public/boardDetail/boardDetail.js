(async () => {
    const likeBtn = document.querySelector('.likeBtn');
    const loginToken = localStorage.getItem('loginToken');

    const result = await axios({
        method: 'POST',
        url: `/community/${window.location.pathname.split('/')[2]}/like/find`,
    });

    if (result.data.result && loginToken) {
        likeBtn.value = 'disabled';
        likeBtn.style.backgroundColor = 'blue';
        likeBtn.style.color = 'white';
    }
})();

document.querySelector('.likeBtn').addEventListener('click', async (e) => {
    // e.preventDefault();
    const likeBtn = document.querySelector('.likeBtn');
    const loginToken = localStorage.getItem('loginToken');

    console.log(loginToken);
    if (loginToken) {
        if (likeBtn.value === 'enabled') {
            console.log(window.location.pathname.split('/')[2]);
            likeBtn.value = 'disabled';
            const result = await axios({
                method: 'POST',
                url: `/community/${
                    window.location.pathname.split('/')[2]
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
                url: `/community/${
                    window.location.pathname.split('/')[2]
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
