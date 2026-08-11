const productId = qs("id") || Store.getProducts()[0]?.id;
const user = Store.getCurrentUser();
let product = Store.getProduct(productId);

if (!product) {
  document.querySelector(".page__inner").innerHTML =
    `<p>상품을 찾을 수 없습니다.</p><div class="detail__back"><a href="../04_items/">목록으로</a></div>`;
} else {
  const imageEl = document.querySelector(".detail__image");
  const nameEl = document.querySelector(".detail__name");
  const priceEl = document.querySelector(".detail__price");
  const likeBtn = document.querySelector(".detail__like");
  const descEl = document.querySelector(".detail__desc");
  const tagsEl = document.querySelector(".detail__tags");
  const form = document.querySelector(".comments__form");
  const emptyEl = document.querySelector(".comments__empty");

  let listEl = document.querySelector(".comments__list");
  if (!listEl) {
    listEl = document.createElement("div");
    listEl.className = "comments__list";
    form.after(listEl);
  }

  function isLiked() {
    return user ? (product.likedBy || []).includes(user.email) : false;
  }

  function renderProduct() {
    if (product.image) {
      imageEl.style.backgroundImage = `url('${product.image}')`;
      imageEl.style.backgroundSize = "cover";
      imageEl.style.backgroundPosition = "center";
    } else {
      imageEl.style.background = product.color || "#e5e7eb";
    }

    nameEl.textContent = product.name;
    priceEl.textContent = Store.formatPrice(product.price);
    likeBtn.textContent = `${isLiked() ? "♥" : "♡"} ${product.favoriteCount || 0}`;
    descEl.textContent = product.description || "";
    tagsEl.innerHTML = (product.tags || [])
      .map((tag) => `<span class="detail__tag">#${escapeHtml(tag)}</span>`)
      .join("");
  }

  function renderComments() {
    const comments = product.comments || [];
    emptyEl.hidden = comments.length > 0;
    listEl.innerHTML = comments
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
      .join("");
  }

  likeBtn.addEventListener("click", () => {
    if (!requireLogin()) return;
    const current = Store.getCurrentUser();
    product.likedBy = product.likedBy || [];
    const idx = product.likedBy.indexOf(current.email);
    if (idx >= 0) {
      product.likedBy.splice(idx, 1);
      product.favoriteCount = Math.max(0, (product.favoriteCount || 0) - 1);
    } else {
      product.likedBy.push(current.email);
      product.favoriteCount = (product.favoriteCount || 0) + 1;
    }
    Store.upsertProduct(product);
    product = Store.getProduct(product.id);
    renderProduct();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!requireLogin()) return;
    const textarea = form.querySelector("textarea");
    const text = textarea.value.trim();
    if (!text) {
      alert("문의 내용을 입력해주세요.");
      return;
    }
    product.comments = product.comments || [];
    product.comments.unshift({
      id: Store.uid("pc"),
      author: Store.getCurrentUser().nickname,
      text,
      date: Store.formatDate(new Date().toISOString()),
    });
    Store.upsertProduct(product);
    product = Store.getProduct(product.id);
    textarea.value = "";
    renderComments();
  });

  renderProduct();
  renderComments();
}
