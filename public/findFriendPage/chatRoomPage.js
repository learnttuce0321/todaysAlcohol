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
            const div = document.createElement('div');
            const formmattedDate = moment(chat.createdAt).format(
                'YYYY. M. D. A h:mm:ss'
            );
            // div.innerText = `${chat.name}: ${chat.content} (${chat.createAt})`;
            div.innerHTML = `<span style="font-weight: 600">${chat.name}</span><span class="dateSpan">(${formmattedDate})</span><p>${chat.content}</p>`;
            chatArea.appendChild(div);
        });
        chatArea.scrollTop = chatArea.scrollHeight;
    }
})();

document.querySelector('.send').addEventListener('click', async () => {
    const chatRoomId = window.location.pathname.split('/')[3];
    const chatInput = document.querySelector('textarea[name="chat"]');

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
document
    .querySelector('textarea[name="chat"]')
    .addEventListener('keyup', async (e) => {
        const chatLength = document.querySelector('textarea').value.length;
        if (chatLength) {
            document.querySelector('.send').disabled = false;
        } else {
            document.querySelector('.send').disabled = true;
        }
        if (e.keyCode === 13) {
            const chatRoomId = window.location.pathname.split('/')[3];
            const chatInput = document.querySelector('textarea[name="chat"]');

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
        }
    });

socket.on('newMessage', (data) => {
    const chatArea = document.getElementById('chatArea');
    const formmattedDate = moment(data.createdAt).format(
        'YYYY. M. D. A h:mm:ss'
    );

    const div = document.createElement('div');
    div.innerHTML = `<span style="font-weight: 600">${data.name}</span><span class="dateSpan">(${formmattedDate})</span><p>${data.content}</p>`;
    chatArea.appendChild(div);
    chatArea.scrollTop = chatArea.scrollHeight;
});
document.querySelector('.nav-user').addEventListener('click', () => {
    document
        .querySelector('.user-container')
        .classList.toggle('user-container-toggle');
});
