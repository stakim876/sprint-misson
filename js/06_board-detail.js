const postId = qs("id") || Store.getPosts()[0]?.id;
const user = Store.getCurrentUser();
let post = Store.getPost(postId);

if (!post) {
  document.querySelector(".page__inner").innerHTML =
    `<p>게시글을 찾을 수 없습니다.</p><div class="post__back"><a href="../06_board/">목록으로</a></div>`;
} else {
  const titleEl = document.querySelector(".post__title");
  const nameEl = document.querySelector(".post__name");
  const dateEl = document.querySelector(".post__date");
  const contentEl = document.querySelector(".post__content");
  const likeBtn = document.querySelector(".post__like");
  const editLink = document.querySelector(".post__actions a");
  const deleteBtn = document.querySelector(".post__actions button");
  const form = document.querySelector(".post-comments__form");
  const listEl = document.querySelector(".comment-list");

  function isLiked() {
    return user ? (post.likedBy || []).includes(user.email) : false;
  }

  function isOwner() {
    if (!user) return false;
    if (post.authorEmail) return post.authorEmail === user.email;
    return post.author === user.nickname;
  }

  function renderPost() {
    titleEl.textContent = post.title;
    nameEl.textContent = post.author;
    dateEl.textContent = Store.formatDate(post.createdAt);
    contentEl.textContent = post.content;
    likeBtn.textContent = `${isLiked() ? "♥" : "♡"} ${post.like || 0}`;

    if (isOwner()) {
      editLink.href = `../06_board-write/?id=${encodeURIComponent(post.id)}`;
      editLink.hidden = false;
      deleteBtn.hidden = false;
    } else {
      editLink.hidden = true;
      deleteBtn.hidden = true;
    }
  }

  function renderComments() {
    const comments = post.comments || [];
    listEl.innerHTML =
      comments.length > 0
        ? comments
            .map(
              (c) => `
          <article class="comment-item">
            <div class="comment-item__avatar"></div>
            <div>
              <p class="comment-item__name">${escapeHtml(c.author)}</p>
              <p class="comment-item__text">${escapeHtml(c.text)}</p>
              <p class="comment-item__date">${escapeHtml(c.date)}</p>
            </div>
          </article>`
            )
            .join("")
        : `<p class="comments__empty-text">아직 댓글이 없어요.</p>`;
  }

  likeBtn.addEventListener("click", () => {
    if (!requireLogin()) return;
    const current = Store.getCurrentUser();
    post.likedBy = post.likedBy || [];
    const idx = post.likedBy.indexOf(current.email);
    if (idx >= 0) {
      post.likedBy.splice(idx, 1);
      post.like = Math.max(0, (post.like || 0) - 1);
    } else {
      post.likedBy.push(current.email);
      post.like = (post.like || 0) + 1;
    }
    Store.upsertPost(post);
    post = Store.getPost(post.id);
    renderPost();
  });

  deleteBtn.addEventListener("click", () => {
    if (!isOwner()) return;
    if (!confirm("게시글을 삭제할까요?")) return;
    Store.deletePost(post.id);
    location.href = "../06_board/";
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!requireLogin()) return;
    const textarea = form.querySelector("textarea");
    const text = textarea.value.trim();
    if (!text) {
      alert("댓글을 입력해주세요.");
      return;
    }
    post.comments = post.comments || [];
    post.comments.unshift({
      id: Store.uid("bc"),
      author: Store.getCurrentUser().nickname,
      text,
      date: Store.formatDate(new Date().toISOString()),
    });
    Store.upsertPost(post);
    post = Store.getPost(post.id);
    textarea.value = "";
    renderComments();
  });

  renderPost();
  renderComments();
}