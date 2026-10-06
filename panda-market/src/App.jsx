import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemsPage from "./pages/ItemsPage";
import AddItemPage from "./pages/AddItemPage";
import BoardPage from "./pages/BoardPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import BoardWritePage from "./pages/BoardWritePage";

// BrowserRouter가 주소창을 읽고, path가 일치하는 Route의 element만 렌더한다.
// :id는 고정 문자가 아니다. /items/p1 이면 id 값이 "p1"이 된다.
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ItemsPage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/additem" element={<AddItemPage />} />
        <Route path="/board" element={<BoardPage />} />
        {/* /board/write 는 목록보다 구체적인 경로라 글쓰기 화면으로 매칭된다. */}
        <Route path="/board/write" element={<BoardWritePage />} />
        <Route path="/items/:id" element={<ItemDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
