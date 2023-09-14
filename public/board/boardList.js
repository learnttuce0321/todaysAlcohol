// 글쓰기 버튼
const loginToken = localStorage.getItem('loginToken');

function writeBoard() {
    if (loginToken) {
        window.location.href = '/community/write';
    } else {
        alert('로그인 후 사용 가능합니다.');
        window.location.href = '/login';
    }
}
