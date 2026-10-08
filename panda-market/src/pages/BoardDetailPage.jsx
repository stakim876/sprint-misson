import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  addPostComment,
  formatDate,
  getPost,
  togglePostLike,
} from "../data/post";
import "../App.css";

// version을 올리면 getPost를 다시 읽어 좋아요와 댓글을 화면에 반영한다.
function BoardDetailPage() {
  const { id } = useParams();
  const [version, setVersion] = useState(0);
  const [draft, setDraft] = useState("");
  const post = getPost(id);

  useEffect(() => {
    document.title = post
      ? `${post.title} | 판다마켓`
      : "게시글 상세 | 판다마켓";
    return () => {
      document.title = "판다마켓";
    };
  }, [post, version]);

  function refresh() {
    setVersion((value) => value + 1);
  }

  if (!post) {
    return (
      <>
        <Header />
        <main>
          <p>게시글을 찾을 수 없습니다.</p>
          <p className="post-back">
            <Link to="/board">목록으로</Link>
          </p>
        </main>
        <Footer />
      </>
    );
  }

  const comments = post.comments ?? [];

  function handleLike() {
    togglePostLike(post.id);
    refresh();
  }

  // preventDefault가 없으면 댓글 등록 때 페이지가 새로고침된다.
  function handleSubmit(event) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    addPostComment(post.id, {
      id: `c${Date.now()}`,
      author: "판다",
      text,
      date: new Date().toISOString().slice(0, 10),
    });
    setDraft("");
    refresh();
  }

  return (
    <>
      <Header />
      <main className="post-detail">
        <h1>{post.title}</h1>
        <div className="post-head">
          <div className="post-author">
            <span className="post-avatar" />
            <div>
              <p className="post-name">{post.author}</p>
              <p className="post-date">{formatDate(post.createdAt)}</p>
            </div>
          </div>
        </div>
        <p className="post-content">{post.content}</p>
        <button type="button" className="post-like" onClick={handleLike}>
          {post.liked ? "♥" : "♡"} {post.like}
        </button>
        <section className="post-comments">
          <h2>댓글달기</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              value={draft}
              placeholder="댓글을 입력해주세요."
              onChange={(event) => setDraft(event.target.value)}
            />
            <button type="submit">등록</button>
          </form>
          {comments.length === 0 ? (
            <p className="comments-empty">아직 댓글이 없어요.</p>
          ) : (
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>
                  <span className="post-avatar" />
                  <div>
                    <p className="post-name">{comment.author}</p>
                    <p className="comment-text">{comment.text}</p>
                    <p className="post-date">{formatDate(comment.date)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
        <p className="post-back">
          <Link to="/board">목록으로</Link>
        </p>
      </main>
      <Footer />
    </>
  );
}

export default BoardDetailPage;
