// 상단 바. 링크 주소는 App.jsx의 Route path와 같아야 화면이 나온다.
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