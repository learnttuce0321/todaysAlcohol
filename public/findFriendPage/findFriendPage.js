const participate = async (roomId, e) => {
    const result = await axios({
        method: 'POST',
        url: '/find-friends/joinRoom',
        data: {
            roomId,
        },
    });

    if (result.data.result) {
        window.location.href = `/find-friends/chat-room/${roomId}`;
    }
};

(async () => {
    const result = await axios({
        method: 'POST',
        url: '/find-friends/participation',
    });

    if (result.data.result) {
        const participationContainer = document.querySelector('#participation');
        result.data.participation.forEach((room) => {
            const div = document.createElement('div');
            div.classList.add('box1');
            div.innerHTML = `
			<span class='roomName_span'>
			<h1 class='roomName'>${room.roomName}</h1>
			<p>${room.roomInfo}</p>
			<a href="/find-friends/chat-room/${room.roomId}"><button class='part_btn'><i class="fa-solid fa-comments"></i></button></a>
		</span>
        `;
            participationContainer.appendChild(div);
        });
    }
})();
document.querySelector('.createRoomBtn').addEventListener('click', async () => {
    const loginToken = localStorage.getItem('loginToken');

    if (loginToken) {
        const roomName = document.querySelector('input[name="roomName"]');
        const roomInfo = document.querySelector('input[name="roomInfo"]');
        if (!roomName.value.length) {
            alert('방이름을 입력하세요');
            return;
        }
        if (!roomName.value.length) {
            alert('방 설명을 입력하세요');
            return;
        }
        const data = {
            roomName: roomName.value,
            roomInfo: roomInfo.value,
        };

        const result = await axios({
            method: 'POST',
            url: '/find-friends/register-room',
            data,
        });

        // socket.emit('createRoom', {
        //     ...data,
        //     // userName: result.data.userName,
        //     chatRoomId: result.data.chatRoomId,
        // });
        alert(`${data.roomName}이 생성되었습니다.`);
        window.location.href = `/find-friends/chat-room/${data.chatRoomId}`;

        roomName.value = '';
        roomInfo.value = '';
    } else {
        alert('로그인 후 사용이 가능합니다');
        window.location.href = '/login';
    }
});
document.querySelector('.find').addEventListener('click', async () => {
    const findWordInput = document.querySelector('input[name="find"]');
    const allRoom = document.querySelector('#allRoom');
    const result = await axios({
        method: 'POST',
        url: '/find-friends/findRoom',
        data: {
            findWord: findWordInput.value,
        },
    });

    console.log(result.data);
    if (result.data.result) {
        allRoom.innerHTML = '';
        result.data.findResult.forEach((room) => {
            const div = document.createElement('div');
            div.innerHTML = `
                <div>
                    <h1>${room.roomName}</h1>
                    <p>${room.roomInfo}</p>
                    <button onClick=participate(${room.id})>참가하기</button>
                </div>
            `;
            allRoom.appendChild(div);
        });
    } else {
        allRoom.innerHTML = '<h1>검색결과 없음</h1>';
    }
});

// socket.on('createRoom', (data) => {
//     alert(`${data.roomName}이 생성되었습니다.`);
//     window.location.href = `/find-friends/chat-room/${data.chatRoomId}`;
// });
//채팅방 검색 클릭시 / x 버튼 눌렀을 때
document.querySelector('.nav-search').addEventListener('click', () => {
    document.querySelector('.chat-search').classList.add('search-div');
    document.querySelector('.exit').addEventListener('click', () => {
        document.querySelector('.chat-search').classList.remove('search-div');
        document.querySelector('.chat-add').classList.add('disappear');
        document.querySelector('.chat-list').classList.remove('disappear');
    });
});

//채팅방 만들기 클릭했을 때
document.querySelector('.nav-chat-add').addEventListener('click', () => {
    document.querySelector('#chat-list').classList.add('disappear');
    document.querySelector('#chat-add').classList.remove('disappear');
});
//목록 클릭했을 때
document.querySelector('#nav-list').addEventListener('click', () => {
    document.querySelector('.chat-list').classList.remove('disappear');
    document.querySelector('.chat-search').classList.remove('search-div');
    document.querySelector('.chat-add').classList.add('disappear');
    document.querySelector('.chat-search').classList.add('disppear');
});
// 

//반응형(390px)
window.addEventListener('resize', () => {
    const windowWidth = window.innerWidth;
    console.log('123');
    
    if (windowWidth <= 390) {
        console.log('390');
        
        document.querySelector('.nav-list').innerHTML = '<i class="fa-solid fa-comments"></i>';
        document.querySelector('.nav-chat-add').innerHTML = '<i class="fa-solid fa-plus"></i>';
        document.querySelector('.nav-search').innerHTML= '<i class="fa-solid fa-magnifying-glass"></i>'
    } else if (windowWidth > 390) {
        document.querySelector('.nav-list').innerText = '목록';
        document.querySelector('.nav-chat-add').innerText = '채팅방 만들기';
        document.querySelector('.nav-search').innerText= '채팅방 검색'
    }
})
