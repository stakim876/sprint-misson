import { useState } from "react";
import Header from "../components/Header";
import ItemCard from "../components/ItemCard";
import Footer from "../components/Footer";
import { getItems } from "../data/items";
import "../App.css";

const pageSize = 5;

// keyword, sort, page만 state다. 카드 목록은 매 렌더마다 이 값으로 다시 계산하는 파생 값이다.
function ItemsPage() {
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const items = getItems();
  // sort는 원본 배열을 바꾸므로, 복사본을 만들어 정렬한다.
  const bestItems = [...items]
    .sort((a, b) => b.favoriteCount - a.favoriteCount)
    .slice(0, 4);
  // filter로 이름에 검색어가 있는 상품만 남긴다. 좋아요순일 때만 favoriteCount로 다시 정렬한다.
  const sellingItems = items
    .filter((item) => item.name.includes(keyword.trim()))
    .sort((a, b) =>
      sort === "favorite" ? b.favoriteCount - a.favoriteCount : 0
    );
  // 시작 인덱스는 (현재 페이지 - 1) * 5 다. 그 위치에서 pageSize개만 자른다.
  const pageCount = Math.max(1, Math.ceil(sellingItems.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pagedItems = sellingItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  // 검색·정렬 후 결과 개수가 줄면 없는 페이지를 가리킬 수 있어 1페이지로 되돌린다.
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

export default ItemsPage;
