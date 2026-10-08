// 모듈이 한 번 로드하면 이 배열은 페이지를 옮겨도 메모리에 남는다.
let posts = [
  {
    id: "b1",
    title: "판다마켓 꿀팁 공유합니다.",
    author: "판다",
    like: 12,
    createdAt: "2024-04-12",
    content:
      "안녕하세요! 판다마켓을 이용하면서 도움이 됐던 팁을 공유해요.\n\n1. 상품 사진은 밝은 곳에서 여러 장 찍어보세요.\n2. 태그를 잘 달면 검색에 잘 노출됩니다.\n3. 가격은 비슷한 매물을 참고하면 좋아요.\n\n모두 좋은 거래 하세요!",
    comments: [
      {
        id: "c1",
        author: "코드잇",
        text: "좋은 정보 감사합니다!",
        date: "2024-04-12",
      },
      {
        id: "c2",
        author: "스프린터",
        text: "태그 팁이 특히 유익했어요.",
        date: "2024-04-13",
      },
    ],
  },
  {
    id: "b2",
    title: "중고거래 사기 예방 체크리스트",
    author: "코드잇",
    like: 20,
    createdAt: "2024-04-10",
    content: "직거래를 우선하고, 입금 전 상대를 꼭 확인하세요.",
    comments: [],
  },
  {
    id: "b3",
    title: "이번 주 추천 매물 모음",
    author: "스프린터",
    like: 8,
    createdAt: "2024-04-08",
    content: "이번 주 인기 매물을 모아봤습니다.",
    comments: [],
  },
  {
    id: "b4",
    title: "노트북 판매 후기",
    author: "미니",
    like: 5,
    createdAt: "2024-04-01",
    content: "배터리가 오래 가서 만족합니다.",
    comments: [],
  },
];

// 2024-04-12 를 2024. 04. 12 로 보여 준다.
export function formatDate(value) {
  const [year, month, day] = String(value).slice(0, 10).split("-");
  if (!year || !month || !day) return value;
  return `${year}. ${month}. ${day}`;
}

// 목록 화면은 이 함수로 현재 배열을 읽는다.
export function getPosts() {
  return posts;
}

export function getPost(id) {
  return posts.find((post) => post.id === id);
}

// 기존 배열을 수정하지 않고, 새 글을 앞에 둔 새 배열로 바꾼다.
export function addPost(post) {
  posts = [post, ...posts];
}

// 같은 id만 좋아요를 뒤집는다. 이미 누른 글은 수를 줄인다.
export function togglePostLike(id) {
  posts = posts.map((post) => {
    if (post.id !== id) return post;
    const liked = !post.liked;
    return {
      ...post,
      liked,
      like: Math.max(0, post.like + (liked ? 1 : -1)),
    };
  });
}

// 새 댓글은 목록 앞에 둔다. 다른 글의 댓글 배열은 그대로 둔다.
export function addPostComment(id, comment) {
  posts = posts.map((post) => {
    if (post.id !== id) return post;
    return { ...post, comments: [comment, ...(post.comments ?? [])] };
  });
}
