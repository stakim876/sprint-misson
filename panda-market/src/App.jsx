import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemsPage from "./pages/ItemsPage";
import AddItemPage from "./pages/AddItemPage";
import BoardPage from "./pages/BoardPage";
import ItemDetailPage from "./pages/ItemDetailPage";

// 주소마다 다른 페이지를 보여 준다. 여기 없는 주소는 빈 화면이 된다.
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* / 와 /items 는 목록, /items/:id 는 그 상품 상세, /additem 은 등록 폼 */}
        <Route path="/" element={<ItemsPage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/additem" element={<AddItemPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/items/:id" element={<ItemDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
