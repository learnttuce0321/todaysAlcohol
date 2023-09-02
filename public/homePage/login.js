/**
 * 로그인 함수, 유효성 검사
 */
async function loginFunc() {
	const FORM = document.forms['signinform'];

	if (FORM.user_id.value == '') {
		alert('아이디를 입력해야 합니다.');
		FORM.user_id.focus(); //포커스를 id박스로 이동.
		return;
	}

	//아이디 입력 문자수 제한하는 조건문
	if (FORM.user_id.value.length < 8 || FORM.user_id.value.length > 20) {
		alert('아이디는 8~20자 이내로 입력 가능합니다.');
		FORM.user_id.select(); //입력한 문자를 선택 상태로 만듬.
		return;
	}

	//문자 입력시, 문자 검사 : 입력된 문자의 길이만큼 루프를 돌면서 검사
	for (i = 0; i < FORM.user_id.value.length; i++) {
		let ch = FORM.user_id.value.charAt(i); //문자를 반환(정수형), 범위 검사 가능

		//입력된 문자를 검사
		if ((ch < 'a' || ch > 'z') && (ch < '0' || ch > '9')) {
			alert('아이디는 영문 소문자로만 입력 가능 합니다.');
			FORM.user_id.select();
			return;
		}
	}

	//입력된 첫번째 문자가 숫자인지 검사하는 조건문

	if (!isNaN(FORM.user_id.value.substr(0, 1))) {
		alert('아이디는 숫자로 시작할 수 없습니다.');
		FORM.user_id.select();
		return;
	}

	//비밀번호 검사 -------------------------------------------------------------------------

	if (FORM.user_pw.value == '') {
		alert('비밀번호를 입력 해야 합니다.');
		FORM.user_pw.focus(); //포커스를 Password박스로 이동.
		return;
	}

	if (FORM.user_pw.value.length < 4 || FORM.user_pw.value.length > 12) {
		alert('비밀번호는 4~12자 이내로 입력 가능 합니다.');
		FORM.user_pw.select();
		return;
	}

	const data = {id: FORM.user_id.value, pw: FORM.user_pw.value};

	console.log(data);
	//console.log(data);
	const res = await axios({
		method: 'POST',
		url: '/login',
		data,
	});

	//데이터베이스에 있으면 메인화면으로 이동
	if (res.data.result) {
		console.log('로그인 성공');
		document.location.href = '/';
	} else {
		document.location.reload = 'login';
	}
}

/**
 * 회원가입 함수
 */
function signupFunc() {
	//회원가입 url입력
	window.location.href = '/signup';
}
