const products = [
  { name: "아이폰 14 Pro", price: 980000, favoriteCount: 24, color: "#c7d2fe" },
  { name: "맥북 에어 M2", price: 1250000, favoriteCount: 18, color: "#bbf7d0" },
  { name: "에어팟 프로 2", price: 220000, favoriteCount: 31, color: "#fecaca" },
  { name: "나이키 운동화", price: 89000, favoriteCount: 12, color: "#fde68a" },
  { name: "아이패드 에어", price: 650000, favoriteCount: 9, color: "#ddd6fe" },
  { name: "갤럭시 워치", price: 180000, favoriteCount: 15, color: "#a5f3fc" },
  { name: "로지텍 마우스", price: 45000, favoriteCount: 7, color: "#fbcfe8" },
  { name: "기계식 키보드", price: 120000, favoriteCount: 21, color: "#bfdbfe" },
  { name: "모니터 27인치", price: 310000, favoriteCount: 11, color: "#d9f99d" },
  { name: "블루투스 스피커", price: 56000, favoriteCount: 6, color: "#fed7aa" },
];

function formatPrice(price) {
  return price.toLocaleString("ko-KR") + "원";
}

function createCard(product) {
  return `
    <a class="product-card" href="../05_item-detail/">
      <div class="product-card__thumb" style="background:${product.color}"></div>
      <div>
        <p class="product-card__name">${product.name}</p>
        <p class="product-card__price">${formatPrice(product.price)}</p>
        <p class="product-card__like">♡ ${product.favoriteCount}</p>
      </div>
    </a>
  `;
}

document.getElementById("bestGrid").innerHTML = products
  .slice(0, 4)
  .map(createCard)
  .join("");

document.getElementById("allGrid").innerHTML = products.map(createCard).join("");
