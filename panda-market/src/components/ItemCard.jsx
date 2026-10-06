import { Link } from "react-router-dom";
// Link는 문서를 다시 받지 않고 주소만 /items/:id 로 바꾼다. 상세 페이지가 그 id로 상품을 찾는다.
function ItemCard({ item }) {
  // 가격은 980000 을 980,000 처럼 천 단위로 끊는다.
  const price = item.price.toLocaleString("ko-KR");
  return (
    <Link to={`/items/${item.id}`} className="product-card">
      <img src={item.image} alt="" />
      <h3>{item.name}</h3>
      <p>{price}원</p>
      <span>♥ {item.favoriteCount}</span>
    </Link>
  );
}

export default ItemCard;