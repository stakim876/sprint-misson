import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import items from "../data/items";
import "../App.css";

// 주소의 id 와 같은 상품 하나를 찾아 이미지, 가격, 소개, 태그를 그린다.
function ItemDetailPage() {
  const { id } = useParams();
  const item = items.find((product) => product.id === id);
  
  if (!item) {
    return (
      <>
       <Header />
       <main>
         <p>상품을 찾을 수 없습니다.</p>
         <Link to="/items">목록으로</Link>
       </main>
       <Footer/>
      </>  
    );
  }

  // 가격은 980000 을 980,000 처럼 천 단위로 끊는다.
  const price = item.price.toLocaleString("ko-KR");

  return (
    <>
     <Header />
     <main>
       <section className="detail">
         <img src={item.image} alt="" />
         <div>
           <h1>{item.name}</h1> 
           <p className="detail-price">{price}원</p>
           <p>♥ {item.favoriteCount}</p>
           <h2>상품 소개</h2>
           <p className="detail-desc">{item.description}</p>
           <h2>상품 태그</h2>
           <div className="detail-tags">
             {item.tags.map((tag) =>(
               <span key={tag}>#{tag}</span> 
             ))}
           </div>
         </div>
       </section>
       <p className="detail-back">
          <Link to="/items">목록으로</Link>
       </p>
     </main>
     <Footer />
    </>
  );
}

export default ItemDetailPage;