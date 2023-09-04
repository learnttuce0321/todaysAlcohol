// 회원가입
async function allowRegister() {
    console.log('allow resgit');
    var userId = document.getElementById('userId');
    var password = document.getElementById('password');
    var passwordRe = document.getElementById('passwordRe');
    var nickname = document.getElementById('nickname');
    var name = document.getElementById('name');
    var email = document.getElementById('email');

    console.log('email', email);
    if (userId.value == '') {
        //해당 입력값이 없을 경우 같은말: if(!uid.value)
        alert('아이디를 입력하세요.');
        userId.focus(); //focus(): 커서가 깜빡이는 현상, blur(): 커서가 사라지는 현상
        return false; //return: 반환하다 return false:  아무것도 반환하지 말아라 아래 코드부터 아무것도 진행하지 말것
    }
    if (password.value == '') {
        alert('비밀번호를 입력하세요.');
        password.focus();
        return false;
    }

    //비밀번호 영문자+숫자+특수조합(8~25자리 입력) 정규식
    var pwdCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    if (!pwdCheck.test(password.value)) {
        alert(
            '비밀번호는 영문자+숫자+특수문자 조합으로 8~25자리 사용해야 합니다.'
        );
        password.focus();
        return false;
    }

    if (passwordRe.value !== password.value) {
        alert('비밀번호가 일치하지 않습니다..');
        passwordRe.focus();
        return false;
    }
    if (nickname.value == '') {
        alert('닉네임을 입력하세요.');
        nickname.focus();
        return false;
    }

    if (name.value == '') {
        alert('이름을 입력하세요.');
        name.focus();
        return false;
    }

    if (email.value == '') {
        alert('이메일 주소를 입력하세요.');
        email_id.focus();
        return false;
    }
    // email 형식 정규식
    var emailCheck =
        /^[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?$/;

    if (!emailCheck.test(email.value)) {
        alert('올바른 이메일 주소를 입력해주세요.');
        password.focus();
        return false;
    }
    try {
        const res = await axios({
            method: 'POST',
            url: '/register',
            data: {
                userId: userId.value,
                password: password.value,
                name: name.value,
                nickname: nickname.value,
                name: name.value,
                email: email.value,
                phone: phone.value,
            },
        });
        if (res.data.result) {
            alert('회원가입을 축하드려요');
            document.location.href = '/';
            // console.log(res.data);
        }
    } catch (error) {
        console.log(error);
    }
}

function cancelRegister() {
    document.location.href = '/';
}
