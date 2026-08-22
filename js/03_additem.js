const user = requireLogin();
if (!user) {
  // redirecting to login
} else {
  const form = document.getElementById("additemForm");
  const imageInput = document.getElementById("image");
  const tagInput = document.getElementById("tag");
  const tagsWrap = document.querySelector(".additem__tags");
  const uploadLabel = document.querySelector(".additem__upload");

  const tags = [];
  let imageData = "";

  function renderTags() {
    tagsWrap.innerHTML = tags
      .map(
        (tag, index) => `
      <span class="additem__tag">#${escapeHtml(tag)}
        <button type="button" data-remove-tag="${index}" aria-label="태그 삭제">×</button>
      </span>`
      )
      .join("");
  }

  tagsWrap.innerHTML = "";

  tagsWrap.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-remove-tag]");
    if (!btn) return;
    tags.splice(Number(btn.dataset.removeTag), 1);
    renderTags();
  });

  tagInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    const value = tagInput.value.trim().replace(/^#/, "");
    if (!value) return;
    if (!tags.includes(value)) tags.push(value);
    tagInput.value = "";
    renderTags();
  });

  imageInput.addEventListener("change", () => {
    const file = imageInput.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      imageData = String(reader.result || "");
      uploadLabel.style.backgroundImage = `url('${imageData}')`;
      uploadLabel.style.backgroundSize = "cover";
      uploadLabel.style.backgroundPosition = "center";
      uploadLabel.classList.add("has-image");
    };
    reader.readAsDataURL(file);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const description = document.getElementById("description").value.trim();
    const priceRaw = document.getElementById("price").value.replace(/[^\d]/g, "");
    const price = Number(priceRaw);

    if (!name) {
      alert("상품명을 입력해주세요.");
      return;
    }
    if (!description) {
      alert("상품 소개를 입력해주세요.");
      return;
    }
    if (!priceRaw || Number.isNaN(price) || price <= 0) {
      alert("올바른 판매가격을 입력해주세요.");
      return;
    }

    const colors = ["#c7d2fe", "#bbf7d0", "#fecaca", "#fde68a", "#ddd6fe", "#a5f3fc"];
    const product = {
      id: Store.uid("p"),
      name,
      description,
      price,
      tags: [...tags],
      image: imageData,
      color: colors[Math.floor(Math.random() * colors.length)],
      favoriteCount: 0,
      likedBy: [],
      comments: [],
      createdAt: new Date().toISOString(),
      owner: user.email,
    };

    Store.upsertProduct(product);
    location.href = `../05_item-detail/?id=${encodeURIComponent(product.id)}`;
  });
}