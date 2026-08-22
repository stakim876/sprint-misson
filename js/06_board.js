const bestEl = document.getElementById("bestPosts");
const listEl = document.getElementById("postList");
const emptyEl = document.getElementById("emptyState");
const searchInput = document.querySelector(".board__search input");

let keyword = "";

function createBestCard(post) {
  return `
    <a class="best-card" href="../06_board-detail/?id=${encodeURIComponent(post.id)}">
      <p class="best-card__badge">🏅 Best</p>
      <p class="best-card__title">${escapeHtml(post.title)}</p>
      <div class="best-card__meta">
        <div class="best-card__author">
          <span class="best-card__avatar"></span>
          <span>${escapeHtml(post.author)}</span>
        </div>
        <span>♡ ${post.like || 0}</span>
      </div>
    </a>
  `;
}

function createListItem(post) {
  return `
    <a class="board-item" href="../06_board-detail/?id=${encodeURIComponent(post.id)}">
      <div>
        <p class="board-item__title">${escapeHtml(post.title)}</p>
        <div class="board-item__meta">
          <span class="board-item__avatar"></span>
          <span>${escapeHtml(post.author)}</span>
          <span>${escapeHtml(Store.formatDate(post.createdAt))}</span>
        </div>
      </div>
      <p class="board-item__like">♡ ${post.like || 0}</p>
    </a>
  `;
}

function getFilteredPosts() {
  const posts = Store.getPosts();
  if (!keyword) return posts;
  const q = keyword.toLowerCase();
  return posts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      (p.content || "").toLowerCase().includes(q) ||
      (p.author || "").toLowerCase().includes(q)
  );
}

function render() {
  const posts = getFilteredPosts();
  const bestPosts = [...Store.getPosts()]
    .sort((a, b) => (b.like || 0) - (a.like || 0))
    .slice(0, 3);

  bestEl.innerHTML = bestPosts.map(createBestCard).join("");
  listEl.innerHTML = posts.map(createListItem).join("");

  const hasPosts = posts.length > 0;
  listEl.hidden = !hasPosts;
  emptyEl.hidden = hasPosts;
}

if (searchInput) {
  searchInput.addEventListener("input", () => {
    keyword = searchInput.value.trim();
    render();
  });
}

render();