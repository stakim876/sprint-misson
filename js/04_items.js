const PAGE_SIZE = 5;
let currentPage = 1;
let keyword = "";
let sortBy = "latest";

const bestGrid = document.getElementById("bestGrid");
const allGrid = document.getElementById("allGrid");
const searchInput = document.querySelector(".items__search input");
const sortSelect = document.querySelector(".items__sort");
const pager = document.querySelector(".items__pager");

function createCard(product) {
  const thumbStyle = product.image
    ? `background-image:url('${product.image}');background-size:cover;background-position:center;`
    : `background:${product.color || "#e5e7eb"}`;

  return `
    <a class="product-card" href="../05_item-detail/?id=${encodeURIComponent(product.id)}">
      <div class="product-card__thumb" style="${thumbStyle}"></div>
      <div>
        <p class="product-card__name">${escapeHtml(product.name)}</p>
        <p class="product-card__price">${Store.formatPrice(product.price)}</p>
        <p class="product-card__like">♡ ${product.favoriteCount || 0}</p>
      </div>
    </a>
  `;
}

function getFilteredProducts() {
  let products = Store.getProducts();

  if (keyword) {
    const q = keyword.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.tags || []).some((tag) => String(tag).toLowerCase().includes(q))
    );
  }

  products = [...products].sort((a, b) => {
    if (sortBy === "likes") {
      return (b.favoriteCount || 0) - (a.favoriteCount || 0);
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return products;
}

function renderBest() {
  const best = [...Store.getProducts()]
    .sort((a, b) => (b.favoriteCount || 0) - (a.favoriteCount || 0))
    .slice(0, 4);
  bestGrid.innerHTML = best.map(createCard).join("");
}

function renderPager(totalPages) {
  if (!pager) return;
  const pages = Math.max(1, totalPages);
  currentPage = Math.min(currentPage, pages);
  
  let html = `<button type="button" data-page="prev" ${currentPage <= 1 ? "disabled" : ""}>&lt;</button>`;
  for (let i = 1; i <= pages; i += 1) {
     html += `<button type="button" data-page="next" ${currentPage >= pages ? "disabled" : ""}>&gt;</button>`;
  }
  html += `<button type="button" data-page="next" ${currentPage >= pages ? "disabled" : ""}>&gt;</button>`;
  pager.innerHTML = html;
  }  

  function renderAll() {
    const products = getFilteredProducts();
    const totalPages = Math.ceil(products.length / PAGE_SIZE) || 1;
    const start = (currentPage -1) * PAGE_SIZE;
    const pageItems = products.slice(start, start + PAGE_SIZE);

    allGrid.innerHTML = 
     pageItems.length > 0
     ? pageItems.map(createCard).join("")
     : '<p class="items_empty">검색 결과가 없습니다.</p>';

     renderPager(totalPages);
  }

  function render() {
    renderBest();
    renderAll();
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      keyword = searchInput.value.trim();
      currentPage = 1;
      renderAll();
    });
  }

  if (sortSelect) {
  sortSelect.innerHTML = `
    <option value="latest">최신순</option>
    <option value="likes">좋아요순</option>
  `;
   sortSelect.addEventListener("change", () => {
     sortBy = sortSelect.value;
     currentPage = 1;
     renderAll();
   });
  }

  if (pager) {
    pager.addEventListener("click", (event) =>{
      const btn = event.target.closest("button[data-page]");
      if (!btn || btn.disabled) return;
      const value = btn.dataset.page;
      const products = getFilteredProducts();
      const totalPages = Math.ceil(products.length / PAGE_SIZE) || 1;
      
      if (value === "prev") currentPage = Math.max(1, currentPage -1);
      else if (value === "next") currentPage = Math.min(totalPages, currentPage + 1);
      else currentPage = Number(value);

      renderAll();
    });
  }

  render();
