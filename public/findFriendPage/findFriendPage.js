const socket = io();

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
        console.log(result.data.participation[0]);
        result.data.participation.forEach((room) => {
            const div = document.createElement('div');
            div.innerHTML = `
                <a href="/find-friends/chat-room/${room.roomId}">
                    <h1>${room.roomName}</h1>
                    <p>${room.info}</p>
                </a>
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

        console.log(result.data);
        alert(`${data.roomName}이 생성되었습니다.`);
        window.location.href = `/find-friends/chat-room/${result.data.chatRoomId}`;

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
