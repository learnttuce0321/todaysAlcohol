const submitHandler = async () => {
    const title = document.querySelector('input[name="title"]');

    if (title.value.length === 0) {
        alert('제목을 입력해주세요');
        return;
    }
    if (editor.getMarkdown().length === 0) {
        alert('내용을 작성해주세요');
        return;
    }

    // todos: 사진 s3 연결
    const result = await axios({
        method: 'POST',
        url: '/community/write/content',
        data: {
            title: title.value,
            content: editor.getMarkdown(),
        },
    });

    if (result.data.result) {
        window.location.replace(`/community/${result.data.id}`);
    }
};
