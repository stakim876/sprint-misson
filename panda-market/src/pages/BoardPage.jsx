import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getPosts } from "../data/post";
import "../App.css";
// keyword만 state다. 보이는 글 목록은 매 렌더마다 이 값으로 다시 계산하는 파생 값이다.
function BoardPage() {
  const [keyword, setKeyword] = useState("");
  const visiblePosts = getPosts().filter((post) =>
    post.title.includes(keyword.trim())
  );
  // sort는 원본을 바꾸므로 복사본을 좋아요 순으로 정렬하고 3개만 자른다.
  const bestPosts = [...visiblePosts]
    .sort((a, b) => b.like - a.like)
    .slice(0, 3);
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
            <a className="btn-register" href="/board/write">
              글쓰기
            </a>
          </div>
        </div>
        {visiblePosts.length === 0 ? (
          <p className="comments-empty">게시글이 아직 없어요</p>
        ) : (
          <>
            <section>
              <h2>베스트 게시글</h2>
              <div className="grid grid-best">
                {bestPosts.map((post) => (
                  <article key={post.id} className="post-card">
                    <h3>{post.title}</h3>
                    <p>
                      {post.author} · ♥ {post.like}
                    </p>
                  </article>
                ))}
              </div>
            </section>
            <ul className="post-list">
              {visiblePosts.map((post) => (
                <li key={post.id}>
                  <strong>{post.title}</strong>
                  <span>
                    {post.author} · {post.createdAt} · ♥ {post.like}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
export default BoardPage;