//비밀번호 유효성 검사
function checkPw() {
    const pw = document.forms['userPw'];
    const form = document.forms['editForm'];
    const num = pw.search(/[0-9]/g);
    const eng = pw.search(/[a-z]/gi);
    const spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (pw.length < 8 || pw.length >= 20) {
        alert('8자리에서 20자리 이내로 입력해주세요.');
        return false;
    } else if (pw.search(/\s/) != -1) {
        alert('비밀번호는 공백 없이 입력해주세요.');
        return false;
    } else if (num < 0 || eng < 0 || spe < 0) {
        alert('영문, 숫자, 특수문자를 혼합하여 입력해주세요');
        return false;
    } else {
        console.log('success');
        return true;
    }
}

//닉네임 유효성 검사
function checkEmail() {
    const emailPattern =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (document.forms['userEmail'] === false) {
    }
}
