import { useState } from "react";
import Header from "./components/Header";
import ItemCard from "./components/ItemCard";
import Footer from "./components/Footer";
import items from "./data/items";
import "./App.css";
const pageSize = 5;
// 중고마켓 첫 화면. 헤더 아래에 베스트 상품 4개와 판매 중인 상품을 그린다.
function App() {
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  // 원본 배열은 그대로 두고, 좋아요 수가 많은 순으로 4개만 고른다.
  const bestItems = [...items]
    .sort((a, b) => b.favoriteCount - a.favoriteCount)
    .slice(0, 4);
  // 검색은 이름에 글자가 포함된 상품만 남긴다. 최신순은 원래 순서, 좋아요순은 favoriteCount가 큰 순서다.
  const sellingItems = items
    .filter((item) => item.name.includes(keyword.trim()))
    .sort((a, b) =>
      sort === "favorite" ? b.favoriteCount - a.favoriteCount : 0
    );
  // 판매 목록은 5개씩 잘라 현재 페이지 카드만 그린다.
  const pageCount = Math.max(1, Math.ceil(sellingItems.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pagedItems = sellingItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  // 검색어나 정렬이 바뀌면 1페이지로 돌아간다.
  function changeKeyword(value) {
    setKeyword(value);
    setPage(1);
  }
  function changeSort(value) {
    setSort(value);
    setPage(1);
  }
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
          <div className="section-head">
            <h2>판매 중인 상품</h2>
            <div className="tools">
              <label className="search">
                <span>🔍</span>
                <input
                  type="search"
                  placeholder="검색할 상품을 입력해주세요"
                  value={keyword}
                  onChange={(event) => changeKeyword(event.target.value)}
                />
              </label>
              <a className="btn-register" href="/additem">
                상품 등록하기
              </a>
              <select
                className="sort"
                aria-label="정렬"
                value={sort}
                onChange={(event) => changeSort(event.target.value)}
              >
                <option value="latest">최신순</option>
                <option value="favorite">좋아요순</option>
              </select>
            </div>
          </div>
          <div className="grid grid-all">
            {pagedItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
          <div className="pager">
            <button
              type="button"
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  type="button"
                  key={pageNumber}
                  className={pageNumber === currentPage ? "is-active" : ""}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              )
            )}
            <button
              type="button"
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage === pageCount}
            >
              &gt;
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
