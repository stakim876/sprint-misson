const posts = [
  {
    title: "판다마켓 꿀팁 공유합니다",
    author: "판다",
    date: "2024. 04. 12",
    like: 12,
  },
  {
    title: "중고거래 사기 예방 체크리스트",
    author: "코드잇",
    date: "2024. 04. 10",
    like: 20,
  },
  {
    title: "이번 주 추천 매물 모음",
    author: "스프린터",
    date: "2024. 04. 08",
    like: 8,
  },
  {
    title: "노트북 판매 후기",
    author: "미니",
    date: "2024. 04. 05",
    like: 5,
  },
  {
    title: "처음 오신 분들 환영합니다",
    author: "관리자",
    date: "2024. 04. 01",
    like: 30,
  },
];

const bestPosts = posts.slice(0, 3);
const bestEl = document.getElementById("bestPosts");
const listEl = document.getElementById("postList");

bestEl.innerHTML = bestPosts
  .map(
    (post) => `
    <a class="best-card" href="../06_board-detail/">
      <p class="best-card__badge">🏅 Best</p>
      <p class="best-card__title">${post.title}</p>
      <div class="best-card__meta">
        <div class="best-card__author">
          <span class="best-card__avatar"></span>
          <span>${post.author}</span>
        </div>
        <span>♡ ${post.like}</span>
      </div>
    </a>
  `
  )
  .join("");

listEl.innerHTML = posts
  .map(
    (post) => `
    <a class="board-item" href="../06_board-detail/">
      <div>
        <p class="board-item__title">${post.title}</p>
        <div class="board-item__meta">
          <span class="board-item__avatar"></span>
          <span>${post.author}</span>
          <span>${post.date}</span>
        </div>
      </div>
      <p class="board-item__like">♡ ${post.like}</p>
    </a>
  `
  )
  .join("");
