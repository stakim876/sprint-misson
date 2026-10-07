import { Link } from "react-router-dom";
// Link는 문서를 다시 받지 않고 주소만 /items/:id 로 바꾼다. 상세 페이지가 그 id로 상품을 찾는다.
function productImage(item) {
  // 서버 응답은 images[0], 로컬 상품은 image 다.
  const src = item.images?.[0] || item.image || "/images/item-phone.jpg";
  if (src.includes("example.com")) return "/images/item-phone.jpg";
  return src;
}

function ItemCard({ item }) {
  // 가격은 980000 을 980,000 처럼 천 단위로 끊는다.
  const price = item.price.toLocaleString("ko-KR");
  return (
    <Link to={`/items/${item.id}`} className="product-card">
      <img
        src={productImage(item)}
        alt=""
        onError={(event) => {
          // onerror를 지우지 않으면 기본 이미지도 실패할 때 같은 핸들러가 반복된다.
          event.currentTarget.onerror = null;
          event.currentTarget.src = "/images/item-phone.jpg";
        }}
      />
      <h3>{item.name}</h3>
      <p>{price}원</p>
      <span>♥ {item.favoriteCount}</span>
    </Link>
  );
}

export default ItemCard;