import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { addPost } from "../data/post";
import "../App.css";

// value를 state에 묶은 입력은 제어 컴포넌트다. 화면에 보이는 값의 기준이 state다.
function BoardWritePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // preventDefault가 없으면 제출 때 페이지가 새로고침된다.
  function handleSubmit(event) {
    event.preventDefault();
    // 제목이나 내용이 비어 있으면 글을 추가하지 않는다.
    if (!title.trim() || !content.trim()) return;

    addPost({
      id: `b${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      author: "판다",
      like: 0,
      createdAt: new Date().toISOString().slice(0, 10),
    });
    // 주소만 /board로 바꾼다. 목록 페이지가 다시 그려지며 getPosts()로 새 글을 읽는다.
    navigate("/board");
  }

  return (
    <>
      <Header />
      <main>
        <h1>게시글 쓰기</h1>
        <form className="board-form" onSubmit={handleSubmit}>
          <label>
            *제목
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
          <label>
            *내용
            <textarea
              placeholder="내용을 입력해주세요"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </label>
          <button type="submit">등록</button>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default BoardWritePage;
