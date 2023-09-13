const socket = io();
let userId;

(async () => {
    const chatRoomId = window.location.pathname.split('/')[3];
    const result = await axios({
        method: 'POST',
        url: '/find-friends/chat-room/getUserId',
    });

    userId = result.data.loginUserId;
    console.log(typeof userId);

    socket.emit('joinRoom', {
        chatRoomId,
    });
})();

(async () => {
    const chatRoomId = window.location.pathname.split('/')[3];

    const result = await axios({
        method: 'POST',
        url: `/find-friends/chat-room/${chatRoomId}/beforeChat`,
    });

    if (result.data.result) {
        const chatArea = document.getElementById('chatArea');
        const chats = result.data.chat;

        console.log(result.data.chat[0]);
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
socket.on('size', (data) => {
    console.log(data.size);
    document.querySelector('#size').innerText = `${data.size}명`;
});
