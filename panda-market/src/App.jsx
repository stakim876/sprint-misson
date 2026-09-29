import Header from "./components/Header";
import ItemCard from "./components/ItemCard";
import items from "./data/items";
import "./App.css";

// 중고마켓 첫 화면. 헤더 아래에 베스트 상품 4개와 판매 중인 상품 전체를 그린다.
function App() {
  // 원본 배열은 그대로 두고, 좋아요 수가 많은 순으로 4개만 고른다.
  const bestItems = [...items]
    .sort((a, b) => b.favoriteCount - a.favoriteCount)
    .slice(0, 4);

  return (
    <>
      <Header />
      <main>
        <section>
          <h2>베스트 상품</h2>
          <div className="grid grid-best">
            {bestItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
        <section>
          <h2>판매 중인 상품</h2>
          <div className="grid grid-all">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;