import Header from "../components/Header";
import Footer from "../components/Footer";

// 자유게시판 . App.jsx의 /board 주소에 연결해야 빈 화면이 아니다.
function BoardPage() {
  return (
    <>
      <Header />
      <main>
        <h1>자유게시판</h1>
      </main>
      <Footer />
    </>
  )  
}

export default BoardPage;