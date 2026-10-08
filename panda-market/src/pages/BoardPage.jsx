import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { formatDate, getPosts } from "../data/post";
import "../App.css";
// keyword만 state다. 보이는 글 목록은 매 렌더마다 이 값으로 다시 계산하는 파생 값이다.
function BoardPage() {
  const [keyword, setKeyword] = useState("");
  const posts = getPosts();
  const query = keyword.trim().toLowerCase();
  const visiblePosts = posts.filter((post) => {
    if (!query) return true;
    return (
      post.title.toLowerCase().includes(query) ||
      (post.content || "").toLowerCase().includes(query) ||
      (post.author || "").toLowerCase().includes(query)
    );
  });
  // sort는 원본을 바꾸므로 복사본을 좋아요 순으로 정렬하고 3개만 자른다.
  const bestPosts = [...posts].sort((a, b) => b.like - a.like).slice(0, 3);
  useEffect(() => {
    document.title = "자유게시판 | 판다마켓";
  }, []);
  return (
    <>
      <Header />
      <main>
        <div className="section-head">
          <h1>자유게시판</h1>
          <div className="tools">
            <label className="search">
              <span>🔍</span>
              <input
                type="search"
                placeholder="검색할 게시글을 입력해주세요"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
            </label>
            <Link className="btn-register" to="/board/write">
              글쓰기
            </Link>
          </div>
        </div>
        {bestPosts.length > 0 ? (
          <section>
            <h2>베스트 게시글</h2>
            <div className="grid grid-board">
              {bestPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/board/${post.id}`}
                  className="post-card"
                >
                  <h3>{post.title}</h3>
                  <p>
                    {post.author} · {post.liked ? "♥" : "♡"} {post.like}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
        {visiblePosts.length === 0 ? (
          <p className="comments-empty">게시글이 아직 없어요</p>
        ) : (
          <ul className="post-list">
            {visiblePosts.map((post) => (
              <li key={post.id}>
                <Link to={`/board/${post.id}`}>
                  <strong>{post.title}</strong>
                  <span>
                    {post.author} · {formatDate(post.createdAt)} ·{" "}
                    {post.liked ? "♥" : "♡"} {post.like}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </>
  );
}
export default BoardPage;