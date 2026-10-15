import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getItems } from "../data/items";
import "../App.css";
// useParams의 id는 주소의 :id 문자열이다. find 결과가 없으면 아래 early return으로 빠진다.
// Hook은 그 return보다 먼저 호출한다. 조건문 뒤에서 호출하면 렌더마다 Hook 순서가 달라진다.
function ItemDetailPage() {
  const { id } = useParams();
  const item = getItems().find((product) => product.id === id);
  const [draft, setDraft] = useState("");
  // 문의 객체의 키는 상품 id다. 상품이 바뀌어도 다른 키의 배열은 유지된다.
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
  // preventDefault가 없으면 form 제출이 페이지를 새로고침한다.
  // prev로 직전 state를 읽어 해당 id 배열만 새 배열로 바꾼다. 기존 객체를 직접 수정하지 않는다.
  function handleSubmit(event) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    // 문의 하나는 글자가 아니라 닉네임, 내용, 작성 시간을 가진 객체다.
    setCommentsById((prev) => ({
      ...prev,
      [item.id]: [
        ...(prev[item.id] ?? []),
        {
          image: "/images/logo.png",
          nickname: "김승태",
          content: text,
          updatedAt: new Date().toLocaleString("ko-KR"),
        },
      ],
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
            {/* 문의 칸에 글이 있을 때만 등록 버튼을 #3692FF로 바꾼다. */}
            <button
              type="submit"
              style={{ backgroundColor: draft.trim() ? "#3692FF" : undefined }}
            >
              등록  
            </button>  
          </form>
          {/* commentsById[상품id]가 없으면 ?? [] 이라 빈 목록으로 보고 안내 문구를 그린다. */}
          {comments.length === 0 ? (
            <p className="comments-empty">
              아직 문의가 없어요
              <br />
              궁금한 점이 있으면 문의를 남겨보세요.
            </p>
          ) : (
            <ul>
              {comments.map((comment, index) => (
                <li key={index}>
                  {/* 작성자 자리는 판다 로고가 아니라 회색 동그라미다. */}
                  <span className="comment-avatar" />
                  <strong>{comment.nickname}</strong>
                  <p>{comment.content}</p>
                  <time>{comment.updatedAt}</time>
                </li>
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