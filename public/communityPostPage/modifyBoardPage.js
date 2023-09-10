(async () => {
    console.log(window.location.pathname);

    const result = await axios({
        method: 'POST',
        url: window.location.pathname,
    });

    if (result.data.result) {
        editor = new toastui.Editor({
            el: document.querySelector('#editor'),
            previewStyle: 'vertical',
            height: '80vh',
            toolbarItems: [
                ['heading', 'bold', 'italic', 'strike'],
                ['hr', 'quote'],
                ['ul', 'ol', 'task', 'indent', 'outdent'],
                ['table', 'image', 'link'],
                ['code', 'codeblock'],
                ['scrollSync'],
            ],
            initialEditType: 'wysiwyg',
            initialValue: result.data.board.content,
        });

        document.querySelector('input[name="title"]').value =
            result.data.board.title;
    }
})();

const submitHandler = async () => {
    const title = document.querySelector('input[name="title"]');

    console.log(editor);
    if (title.value.length === 0) {
        alert('제목을 입력해주세요');
        return;
    }
    if (editor.getMarkdown().length === 0) {
        alert('내용을 작성해주세요');
        return;
    }

    if (confirm('수정을 완료하시겠습니까?')) {
        const result = await axios({
            method: 'PATCH',
            url: window.location.pathname,
            data: {
                title: title.value,
                content: editor.getMarkdown(),
            },
        });

        if (result.data.result) {
            alert('수정이 완료되었습니다.');
            window.location.replace(
                `/community/detail/${window.location.pathname.split('/')[3]}`
            );
        }
    }
};
