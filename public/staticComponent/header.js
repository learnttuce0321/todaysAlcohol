const headers = `
<nav class='_navbar' id='headers'>
<div class='navbar-logo'>
<i class="fa-solid fa-martini-glass-citrus"></i>
</div>
    <div class='navbar-menu'>
        <div class='navbar-left'>
            <li><a href="/survey-select">칵테일 추천받기</a></li>
            <li><a href="/alcohol-list">칵테일 알아보기</a></li>
            <li><a href="/community">게시판</a></li>
        </div>
        <div class='navbar-right '>
            <li id='login' ><a href="/login">로그인</a></li>
            <li id='register'><a href="/register">회원가입</a></li>
            <li id='mypage' class='disappear'><a href="/my-page">마이페이지</a></li>
            <li id='logout' class='disappear'><a href="/">로그아웃</a></li>
        </div>
    </div>
<a class='navbar-togglebtn disappear'><i class="fas fa-bars"></i></a>
</nav>
`;
const header = document.getElementById('header');

header.innerHTML = headers;

const toggleBtn = document.querySelector('.navbar-togglebtn');
const logo = document.querySelector('.navbar-logo');
const navbarMenu = document.querySelector('.navbar-menu');

//햄버거 바 클릭시 toggle 이벤트

toggleBtn.addEventListener('click', () => {
    document.querySelector('.navbar-menu').classList.toggle('toggle');
});

//로고 클릭시 홈페이지로 이동
logo.addEventListener('click', () => {
    window.location.href = '/';
});

//반응형(820px)
window.addEventListener('resize', () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 820) {
        document.querySelector('.navbar-menu').classList.add('disappear');
        document
            .querySelector('.navbar-togglebtn')
            .classList.replace('disappear', 'show');
    } else if (windowWidth > 820) {
        document
            .querySelector('.navbar-togglebtn')
            .classList.replace('show', 'disappear');
        document
            .querySelector('.navbar-menu')
            .classList.remove('disappear', 'toggle');
    }
});

(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 820) {
        document.querySelector('.navbar-menu').classList.add('disappear');
        document
            .querySelector('.navbar-togglebtn')
            .classList.replace('disappear', 'show');
    } else if (windowWidth > 820) {
        document
            .querySelector('.navbar-togglebtn')
            .classList.replace('show', 'disappear');
        document
            .querySelector('.navbar-menu')
            .classList.remove('disappear', 'toggle');
    }
})();

(() => {
    const loginToken = localStorage.getItem('loginToken');
    console.log('123');

    if (loginToken) {
        const login = document.querySelector('#login');
        const register = document.querySelector('#register');
        const mypage = document.querySelector('#mypage');
        const logout = document.querySelector('#logout');

        login.classList.add('disappear');
        register.classList.add('disappear');
        mypage.classList.remove('disappear');
        logout.classList.remove('disappear');
    }
})();

//로그아웃시 쿠키삭제 (하는중..)
const logout = document.querySelector('#logout');

logout.addEventListener('click', () => {
    localStorage.removeItem('loginToken');
    axios({
        method: 'POST',
        url: '/logout',
    });
});
