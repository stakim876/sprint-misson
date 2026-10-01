// 상품 카드 하나. image, name, price, favoriteCount 를 화면에 표시한다.
function ItemCard({ item }) {
  // 가격은 980000 을 980,000 처럼 천 단위로 끊는다.
  const price = item.price.toLocaleString("ko-KR");
  
  return (
    <article className="product-card">
      <img src={item.image} alt="" />
      <h3>{item.name}</h3>
      <p>{price}원</p>
      <span>♥ {item.favoriteCount}</span>
    </article>  
  );
}

export default ItemCard;