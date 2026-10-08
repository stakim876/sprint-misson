import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { addItem } from "../data/items";

function AddItemPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tag, setTag] = useState("");
  const navigate = useNavigate();
  // 이미지는 조건에서 뺀다. 상품명, 소개, 가격, 태그가 모두 있어야 등록이 켜진다.
  const canSubmit =
    name.trim() && description.trim() && price.trim() && tag.trim(); 

  function handleSubmit(event) {
    event.preventDefault();
    if (!name.trim()) return;

    addItem({
      id: `p${Date.now()}`,
      name: name.trim(),
      price: Number(price) || 0,
      favoriteCount: 0,
      image: "/images/item-phone.jpg",
      description,
      tags: tag
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    });
    navigate("/items");
  }

  return (
    <>
      <Header />
      <main>
        <div className="additem-head">
          <h1>상품 등록하기</h1>
          <button type="submit" form="additemForm" disabled={!canSubmit}>
            등록
          </button>
        </div>
        <form id="additemForm" onSubmit={handleSubmit}>
          <label>
            상품 이미지
            <input type="file" accept="image/*" />
          </label>
          <label>
            상품명
            <input
              type="text"
              placeholder="상품명을 입력해주세요"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label>
            상품 소개
            <textarea
              placeholder="상품 소개를 입력해주세요"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>
          <label>
            판매가격
            <input
              type="text"
              placeholder="판매 가격을 입력해주세요"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </label>
          <label>
            태그
            <input
              type="text"
              placeholder="태그를 입력해주세요"
              value={tag}
              onChange={(event) => setTag(event.target.value)}
            />
          </label>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default AddItemPage;