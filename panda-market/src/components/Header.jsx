import { useLocation } from "react-router-dom";

// pathname으로 현재 주소를 읽어, 그 주소에 해당하는 메뉴에만 is-active를 준다.
function Header() {
  const { pathname } = useLocation();
  const onBoard = pathname.startsWith("/board");
  
  return (
    <header className="gnb">
      <a href="/" className="logo">
        <img src="/images/logo.png" alt="" />
        <span>판다마켓</span>
      </a>
      <nav>
        <a href="/board" className={onBoard ? "is-active" : ""}>
          자유게시판 
        </a>
        <a href="/items" className={onBoard ? "": "is-active"}>
          중고마켓 
        </a>
      </nav>
    </header>
  );
}

export default Header;