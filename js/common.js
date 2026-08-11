function qs(name) {
  return new URLSearchParams(location.search).get(name);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function requireLogin(redirectPath = "../02_login/") {
  const user = Store.getCurrentUser();
  if (!user) {
    const next = encodeURIComponent(location.href);
    location.href = `${redirectPath}?next=${next}`;
    return null;
  }
  return user;
}

function updateGnbAuth() {
  const loginLink = document.querySelector(".btn-login");
  if (!loginLink) return;

  const user = Store.getCurrentUser();
  if (!user) {
    loginLink.textContent = "로그인";
    loginLink.setAttribute("href", "../02_login/");
    loginLink.onclick = null;
    return;
  }

  loginLink.textContent = `${user.nickname} · 로그아웃`;
  loginLink.removeAttribute("href");
  loginLink.setAttribute("role", "button");
  loginLink.onclick = (event) => {
    event.preventDefault();
    Store.logout();
    location.reload();
  };
}

document.addEventListener("DOMContentLoaded", updateGnbAuth);
