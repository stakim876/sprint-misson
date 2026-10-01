import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// 상품 등록 화면. 입력값은 state에 두고, 등록을 눌러도 페이지가 새로고침되지 않게 한다.
function AddItemPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tag, setTag] = useState("");

  // 기본 제출은 페이지를 다시 불러오므로 막고, 입력값만 확인한다. 목록 저장은 아직 없다.
  function handleSubmit(event) {
    event.preventDefault();
    console.log({ name, description, price, tag });
  }

  return (
    <>
      <Header />
      <main>
        <div className="additem-head">
          <h1>상품 등록하기</h1>
          <button type="submit" form="additemForm">
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