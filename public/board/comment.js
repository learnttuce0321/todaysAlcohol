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
