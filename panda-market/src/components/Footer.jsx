// 하단 바. 저작권, 정책 링크, SNS 아이콘을 보여 준다.
function Footer() {
  return (
    <footer className="footer">
      <p>@codeit - 2024</p>
      <div className="footer-links">
        <a href="/privacy">Privacy Policy</a>
        <a href="/faq">FAQ</a>
      </div>
      <div className="footer-sns">
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <img src="/icons/ic_facebook.png" alt="facebook" />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
          <img src="/icons/ic_twitter.png" alt="twitter" />
        </a>
        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
          <img src="/icons/ic_youtube.png" alt="youtube" />
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <img src="/icons/ic_instagram.png" alt="instagram" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;

