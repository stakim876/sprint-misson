// 상단 바. 로고는 public/images/logo.png 이고, 현재 페이지인 중고마켓만 활성화한다.
function Header() {
  return (
    <header className="gnb">
      <a href="/" className="logo">
        <img src="/images/logo.png" alt="" />
        <span>판다마켓</span>
      </a>
      <nav>
        <a href="/board">자유게시판</a>
        <a href="/items" className="is-active">중고마켓</a>
      </nav>
    </header>    
  );  
}

export default Header;