import { useState } from "react";
import { Link } from "react-router-dom";

// 사진도 이 상품 응답의 images[0]을 쓴다. 다른 상품 사진을 붙이면 이름과 어긋난다.
function productImage(item) {
  const src = item.images?.[0] || item.image || "";
  if (!src || src.includes("example.com")) return "";
  return src;
}

function ItemCard({ item }) {
  const [failed, setFailed] = useState(false);
  const src = productImage(item);
  // 가격은 980000 을 980,000 처럼 천 단위로 끊는다.
  const price = item.price.toLocaleString("ko-KR");
  const showImage = src && !failed;
  return (
    <Link to={`/items/${item.id}`} className="product-card">
      {showImage ? (
        <img src={src} alt="" onError={() => setFailed(true)} />
      ) : (
        <span className="product-photo" />
      )}
      <h3>{item.name}</h3>
      <p>{price}원</p>
      <span>♥ {item.favoriteCount}</span>
    </Link>
  );
}

export default ItemCard;