import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import items from "../data/items";
import "../App.css";
// 주소의 id 와 같은 상품 하나를 찾아 이미지, 가격, 소개, 태그, 문의를 그린다.
function ItemDetailPage() {
  const { id } = useParams();
  const item = items.find((product) => product.id === id);
  const [draft, setDraft] = useState("");
  // 문의는 상품 id 별로 나눠 둔다. 다른 상품 상세와 섞이지 않는다.
  const [commentsById, setCommentsById] = useState({});
  if (!item) {
    return (
      <>
        <Header />
        <main>
          <p>상품을 찾을 수 없습니다.</p>
          <Link to="/items">목록으로</Link>
        </main>
        <Footer />
      </>
    );
  }
  // 가격은 980000 을 980,000 처럼 천 단위로 끊는다.
  const price = item.price.toLocaleString("ko-KR");
  const comments = commentsById[item.id] ?? [];
  // 빈 글은 올리지 않는다. 등록되면 입력창을 비운다.
  function handleSubmit(event) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setCommentsById((prev) => ({
      ...prev,
      [item.id]: [...(prev[item.id] ?? []), text],
    }));
    setDraft("");
  }
  return (
    <>
      <Header />
      <main>
        <section className="detail">
          <img src={item.image} alt="" />
          <div>
            <h1>{item.name}</h1>
            <p className="detail-price">{price}원</p>
            <p>♥ {item.favoriteCount}</p>
            <h2>상품 소개</h2>
            <p className="detail-desc">{item.description}</p>
            <h2>상품 태그</h2>
            <div className="detail-tags">
              {item.tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          </div>
        </section>
        <section className="comments">
          <h2>문의하기</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              value={draft}
              placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
              onChange={(event) => setDraft(event.target.value)}
            />
            <button type="submit">등록</button>
          </form>
          {/* 문의가 없으면 안내 문구를, 있으면 이 상품의 문의만 목록으로 보여 준다. */}
          {comments.length === 0 ? (
            <p className="comments-empty">
              아직 문의가 없어요
              <br />
              궁금한 점이 있으면 문의를 남겨보세요.
            </p>
          ) : (
            <ul>
              {comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
          )}
        </section>
        <p className="detail-back">
          <Link to="/items">목록으로</Link>
        </p>
      </main>
      <Footer />
    </>
  );
}
export default ItemDetailPage;