import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemsPage from "./pages/ItemsPage";
import AddItemPage from "./pages/AddItemPage";
import BoardPage from "./pages/BoardPage";

// 주소마다 다른 페이지를 보여 준다. 여기 없는 주소는 빈 화면이 된다.
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* / 는 중고마켓 목록, /additem 은 상품 등록 폼 */}
        <Route path="/" element={<ItemsPage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/additem" element={<AddItemPage />} />
        <Route path="/board" element={<BoardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
