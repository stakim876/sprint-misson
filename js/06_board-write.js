const user = requireLogin();
if (user) {
  const form = document.querySelector(".board-form");
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");
  const editId = qs("id");

  if (editId) {
    const post = Store.getPost(editId);
    if (!post) {
      alert("게시글을 찾을 수 없습니다.");
      location.href = "../06_board/";
    } else if (post.authorEmail && post.authorEmail !== user.email) {
      alert("수정 권한이 없습니다.");
      location.href = `../06_board-detail/?id=${encodeURIComponent(editId)}`;
    } else {
      document.querySelector(".board-form__title").textContent = "게시글 수정";
      titleInput.value = post.title;
      contentInput.value = post.content;
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!content) {
      alert("내용을 입력해주세요.");
      return;
    }

    let post;
    if (editId) {
      post = Store.getPost(editId);
      if (!post) {
        alert("게시글을 찾을 수 없습니다.");
        return;
      }
      post.title = title;
      post.content = content;
    } else {
      post = {
        id: Store.uid("b"),
        title,
        content,
        author: user.nickname,
        authorEmail: user.email,
        like: 0,
        likedBy: [],
        comments: [],
        createdAt: new Date().toISOString(),
      };
    }

    Store.upsertPost(post);
    location.href = `../06_board-detail/?id=${encodeURIComponent(post.id)}`;
  });
}
