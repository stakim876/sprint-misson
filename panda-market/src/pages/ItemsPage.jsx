import { useState } from "react";
import Header from "../components/Header";
import ItemCard from "../components/ItemCard";
import Footer from "../components/Footer";
import { useMarketLayout } from "../hooks/useMarketLayout";
import { useProducts } from "../hooks/useProducts";
import "../App.css";
// 번호는 최대 5개만 보여 준다. 현재 페이지가 창 밖으로 나가면 창을 옮긴다.
function visiblePages(current, total) {
  const windowSize = 5;
  let start = Math.max(1, current - 2);
  let end = Math.min(total, start + windowSize - 1);
  start = Math.max(1, end - windowSize + 1);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}
function ItemsPage() {
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const { pageSize, bestSize } = useMarketLayout();
  // effect 안에서 setPage를 호출하면 린트 오류가 난다. 렌더 중에 이전 pageSize와 비교해 1로 되돌린다.
  const [pageSizeAtPage, setPageSizeAtPage] = useState(pageSize);
  if (pageSize !== pageSizeAtPage) {
    setPageSizeAtPage(pageSize);
    setPage(1);
  }
  const orderBy = sort === "favorite" ? "favorite" : "recent";
  const best = useProducts({
    page: 1,
    pageSize: bestSize,
    orderBy: "favorite",
    keyword: "",
  });
  const selling = useProducts({
    page,
    pageSize,
    orderBy,
    keyword: keyword.trim(),
  });
  const pageCount = Math.max(1, Math.ceil(selling.totalCount / pageSize));
  const currentPage = Math.min(page, pageCount);
  function changeKeyword(value) {
    setKeyword(value);
    setPage(1);
  }
  function changeSort(value) {
    setSort(value);
    setPage(1);
  }
  const failed = best.error || selling.error;
  return (
    <>
      <Header />
      <main>
        {failed ? <p>{failed}</p> : null}
        {best.loading || selling.loading ? <p>불러오는 중...</p> : null}
        <section>
          <h2>베스트 상품</h2>
          <div className="grid grid-best">
            {best.products.map((item) => (
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
            {selling.products.map((item) => (
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
            {visiblePages(currentPage, pageCount).map((pageNumber) => (
              <button
                type="button"
                key={pageNumber}
                className={pageNumber === currentPage ? "is-active" : ""}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
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
              