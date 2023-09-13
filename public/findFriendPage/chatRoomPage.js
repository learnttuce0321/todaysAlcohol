const socket = io();
let userId;

(async () => {
    const chatRoomId = window.location.pathname.split('/')[3];
    const result = await axios({
        method: 'POST',
        url: '/find-friends/chat-room/getUserId',
    });

    userId = result.data.loginUserId;

    socket.emit('joinRoom', {
        chatRoomId,
        userId,
    });
})();

socket.on('size', async (data) => {
    const participantDiv = document.querySelector('#participant');
    console.log('size', data.size);
    console.log('p', data.participants);
    document.querySelector('#size').innerText = `${data.size}명`;
    participantDiv.innerHTML = '';

    console.log('data', data);
    const result = await axios({
        method: 'POST',
        url: '/find-friends/chat-room/getUserName',
        data: {
            userIdArr: data.participants,
        },
    });
    result.data.userNameArr.forEach((user) => {
        const p = document.createElement('p');
        p.innerText = user;
        participantDiv.appendChild(p);
    });
});

(async () => {
    const chatRoomId = window.location.pathname.split('/')[3];

    const result = await axios({
        method: 'POST',
        url: `/find-friends/chat-room/${chatRoomId}/beforeChat`,
    });

    if (result.data.result) {
        const chatArea = document.getElementById('chatArea');
        const chats = result.data.chat;

        chats.forEach((chat) => {
            const p = document.createElement('p');
            p.innerText = `${chat.name}: ${chat.content} (${chat.createAt})`;
            if (String(chat.id) === result.data.loginUserId) {
                p.style.color = 'red';
            }
            chatArea.appendChild(p);
        });
    }
})();

document.querySelector('.send').addEventListener('click', async () => {
    const chatRoomId = window.location.pathname.split('/')[3];
    const chatInput = document.querySelector('input[name="chat"]');

    if (!chatInput.value.length) {
        alert('메세지를 입력하세요.');
        return;
    }

    const result = await axios({
        method: 'POST',
        url: `/find-friends/chat-room/${chatRoomId}`,
        data: {
            content: chatInput.value,
        },
    });

    if (result.data.result) {
        chatInput.value = '';
        socket.emit('send', { ...result.data });
    }
});

socket.on('newMessage', (data) => {
    const chatArea = document.getElementById('chatArea');

    const p = document.createElement('p');
    p.innerText = `${data.name}: ${data.content} (${data.createdAt})`;
    console.log(data.userId);
    if (userId === String(data.userId)) {
        p.style.color = 'red';
    }
    chatArea.appendChild(p);
});
