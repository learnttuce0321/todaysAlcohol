// loadComment 실행
$(document).ready(function () {
    loadComments();
});

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
        likeBtn.style.backgroundColor = 'blue';
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
                likeBtn.style.backgroundColor = 'blue';
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
const postId = window.location.pathname.split('/')[3];
// console.log(postId);

const ul = document.querySelector('.commentList');
function writeComment() {
    const form = document.forms['commentList'];
    console.log(window.location.pathname);
    axios({
        method: 'POST',
        url: window.location.pathname,
        data: {
            postId,
            content: form.comment.value,
        },
    }).then((result) => {
        // console.log(result);
        const html = `            
                <li>
                <div>${result.data.userId}</div>
                </li>
                <li>
                <div>${result.data.content}</div>
                </li>`;
        ul.insertAdjacentHTML('beforeend', html);
    });
}

// 댓글 목록 불러오기
// async function loadComments() {
//     try {
//         const response = await axios({
//             method: 'GET',
//             url: window.location.pathname,
//         });
//         const comments = response.data;
//         console.log(comments);

//         if (comments && Array.isArray(comments)) {
//             const commentsList = querySelector('.commentList');
//             commentsList.empty(); // Clear existing comments

//             // Iterate through the comments and append them to the DOM
//             comments.forEach(function (comment) {
//                 const commentItem = $('<li>').text(comment.content);
//                 commentsList.append(commentItem);
//             });
//         }
//     } catch (error) {
//         console.error(error);
//     }
// }
