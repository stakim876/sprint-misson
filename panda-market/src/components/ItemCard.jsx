import { Link } from "react-router-dom";
// 상품 카드 하나. 클릭하면 /items/상품id 상세로 이동한다.
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