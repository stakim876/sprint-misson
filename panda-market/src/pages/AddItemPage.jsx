import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// value를 state에 묶은 입력은 제어 컴포넌트다. 화면에 보이는 값의 기준이 state다.
function AddItemPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tag, setTag] = useState("");

  // form 바깥 등록 버튼은 form="additemForm"으로 이 form을 제출한다.
  // preventDefault가 없으면 제출 때 페이지가 새로고침된다. 입력값은 아직 목록 state에 넣지 않는다.
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