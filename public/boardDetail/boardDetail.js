// loadComment 실행
// $(document).ready(function () {
//     loadComments();
// });

// client 좋아요 눌렀는지 확인
(async () => {
    const likeBtn = document.querySelector('.likeBtn');
    const loginToken = localStorage.getItem('loginToken');

    const result = await axios({
        method: 'POST',
        url: `/community/${window.location.pathname.split('/')[3]}/like/find`,
    });

    if (result.data.result && loginToken) {
        likeBtn.value = 'disabled';
        likeBtn.style.backgroundColor = 'orange';
        likeBtn.style.color = 'white';
    }
})();

// 삭제버튼 (작성자만 확인)
(async () => {
    const result = await axios({
        method: 'POST',
        url: `/community/detail/${
            window.location.pathname.split('/')[3]
        }/writer`,
    });

    // console.log(result.data);
    if (!result.data.result) {
        document.querySelector('.deleteBtn').style.display = 'none';
        document.querySelector('.modifyBtn').style.display = 'none';
    }
})();

(async () => {
    const result = await axios({
        method: 'POST',
        url: `/community/detail/${
            window.location.pathname.split('/')[3]
        }/content`,
    });

    let viewer;
    if (result.data.result) {
        viewer = toastui.Editor.factory({
            el: document.querySelector('#viewer'),
            viewer: true,
            initialValue: result.data.content,
        });
    }
})();

document.querySelector('.likeBtn').addEventListener('click', async () => {
    // e.preventDefault();
    const likeBtn = document.querySelector('.likeBtn');
    const loginToken = localStorage.getItem('loginToken');

    // console.log(loginToken);
    if (loginToken) {
        if (likeBtn.value === 'enabled') {
            console.log(window.location.pathname.split('/')[3]);
            likeBtn.value = 'disabled';
            const result = await axios({
                method: 'POST',
                url: `/community/${
                    window.location.pathname.split('/')[3]
                }/like`,
            });
            if (result.data.result) {
                likeBtn.style.backgroundColor = 'orange';
                likeBtn.style.color = 'white';
            }
        } else {
            likeBtn.value = 'enabled';
            const result = await axios({
                method: 'POST',
                url: `/community/${
                    window.location.pathname.split('/')[3]
                }/like/delete`,
            });

            if (result.data.result) {
                likeBtn.removeAttribute('style');
            }
        }
    } else {
        alert('로그인 후 사용 가능합니다.');
        window.location.href = '/login';
    }
});

document.querySelector('.deleteBtn').addEventListener('click', async () => {
    if (confirm('삭제하시겠습니까?')) {
        const result = await axios({
            method: 'POST',
            url: `/community/detail/${
                window.location.pathname.split('/')[3]
            }/delete`,
        });

        if (result.data.result) {
            window.location.replace('/community');
        }
    }
});

document.querySelector('.modifyBtn').addEventListener('click', () => {
    if (confirm('수정하시겠습니까?')) {
        window.location.href = `/community/write/${
            window.location.pathname.split('/')[3]
        }`;
    }
});

// comment.js

//현재 날짜, 시간
// let now = new Date();
// let year = now.getFullYear().toString();
// year = year.substr(2, 4);
// console.log(year);
// let month = now.getMonth();
// let date = now.getDate();
// let hours = now.getHours();
// let minutes = now.getMinutes();
// let seconds = now.getSeconds();
// let setTime = `${year}.${month}.${date} ${hours}:${minutes}:${seconds}`;
// console.log(setTime);

const postId = window.location.pathname.split('/')[3];
// console.log(postId);

const ul = document.querySelector('.commentList');

const postComment = () => {
    const commentInput = document.getElementById('comment');
    const commentPostBtn = document.getElementsByClassName('commentBtn')[0];

    const writeComment = () => {
        const form = document.forms['commentList'];
        const loginToken = localStorage.getItem('loginToken');

        console.log(window.location.pathname);
        if (loginToken) {
            const currentTime = new Date().toLocaleString();
            console.log(currentTime);

            axios({
                method: 'POST',
                url: window.location.pathname,
                data: {
                    postId,
                    content: form.comment.value,
                    timestamp: currentTime,
                },
            }).then((result) => {
                console.log(result);
                // const html = `
                //         <li>
                //         <div>${result.data.userId}:</div>
                //         </li>
                //         <li>
                //         <div>${result.data.content}</div>
                //         </li>
                //        `;
                // ul.insertAdjacentHTML('beforeend', html);
                const listItem = document.createElement('li');
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comment';
                commentDiv.innerHTML = `<strong> ${result.data.userId}</strong><p>${result.data.content}</p><p style="font-size:5px">${currentTime}</p>`;
                listItem.appendChild(commentDiv);
                commentListContainer.appendChild(listItem);
            });
        } else {
            alert('로그인 후 사용 가능합니다.');
            window.location.href = '/login';
        }
        commentInput.value = '';
    };
    // enter키 입력시 submit 방지
    document.addEventListener(
        'keydown',
        function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
            }
        },
        true
    );
    // 사용자 입력 들어올 시, 게시 버튼 활성화
    commentInput.addEventListener('keyup', (event) => {
        commentInput.value
            ? (commentPostBtn.style.opacity = '1')
            : (commentPostBtn.style.opacity = '0.1');
        // enter 키로 댓글 입력
        if (event.keyCode === 13 && commentInput.value) {
            writeComment();
        } else if (event.keyCode === 13 && commentInput.value.trim() === '') {
            alert('댓글이 입력되지 않았습니다 🥺');
        }
    });

    // 클릭으로 댓글 입력
    commentPostBtn.addEventListener('click', () => {
        if (commentInput.value) {
            writeComment();
        } else if (commentInput.value === '') {
            alert('댓글이 입력되지 않았습니다!');
        }
    });
};

postComment();

// 댓글 목록 불러오기 (페이징기능X)
// async function loadComments() {
//     try {
//         const response = await axios({
//             method: 'GET',
//             url: `/community/detail/${postId}/comments`,
//         });
//         const comments = response.data.comments;
//         console.log(comments);

//         comments.forEach((comment) => {
//             const listItem = document.createElement('li');
//             const commentDiv = document.createElement('div');
//             commentDiv.className = 'comment';
//             commentDiv.innerHTML = `<strong> ${comment.userId}</strong><p>${comment.content}</p>`;
//             listItem.appendChild(commentDiv);
//             commentListContainer.appendChild(listItem);

//             // console.log(`User: ${comment.userId}, Content: ${comment.content}`);
//         });
//     } catch (error) {
//         console.error(error);
//     }
// }

/////////////////////////////////////////////////////

function getCurrentPageNumber() {
    const searchParams = new URLSearchParams(window.location.search);
    const page = parseInt(searchParams.get('page')) || 1;
    return page;
}

async function loadComments(page) {
    try {
        const response = await axios({
            method: 'GET',
            url: `/community/detail/${postId}/comments?page=${page}`,
        });
        const comments = response.data.comments;
        console.log(comments);

        const commentListContainer = document.getElementById(
            'commentListContainer'
        );
        commentListContainer.innerHTML = '';

        comments.forEach((comment) => {
            const listItem = document.createElement('li');
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment';
            const formattedCreatedAt = moment(comment.createdAt).format(
                'YYYY. M. D. A h:mm:ss'
            );

            commentDiv.innerHTML = `<strong>${comment.userId}</strong><p>${comment.content}</p><p style="font-size:7px">${formattedCreatedAt}</p>`;
            listItem.appendChild(commentDiv);
            commentListContainer.appendChild(listItem);
        });
    } catch (error) {
        console.error(error);
    }
}

function renderPagination(totalPages) {
    const pagination = document.getElementById('commentPagination');
    pagination.innerHTML = '';

    const currentPage = getCurrentPageNumber();

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = 'page-item';
        const link = document.createElement('a');
        link.className = 'page-link';
        link.href = `#`;
        link.textContent = i;
        li.appendChild(link);
        pagination.appendChild(li);

        if (i === currentPage) {
            li.classList.add('active');
        }

        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageClicked = parseInt(link.textContent);
            loadComments(pageClicked);
        });
    }
}

$(document).ready(async function () {
    const currentPage = getCurrentPageNumber();
    loadComments(currentPage);
    const response = await axios.get(
        `/community/detail/${postId}/comments/?page=${currentPage}`
    );
    const totalPages = response.data.totalPages;
    renderPagination(totalPages);
});
