// 모듈이 한 번 로드하면 이 배열은 페이지를 옮겨도 메모리에 남는다.
let posts = [
  {
    id: "b1",
    title: "판다마켓 꿀팁 공유합니다.",
    author: "판다",
    like: 12,
    createdAt: "2024-04-12",
  },
  {
    id: "b2",
    title: "중고거래 사기 예방 체크리스트",
    author: "코드잇",
    like: 20,
    createdAt: "2024-04-10",
  },
  {
    id: "b3",
    title: "이번 주 추천 매물 모음",
    author: "스프린터",
    like: 8,
    createdAt: "2024-04-08",
  },
  {
    id: "b4",
    title: "노트북 판매 후기",
    author: "미니",
    like: 5,
    createdAt: "2024-04-01",
  },  
];

// 목록 화면은 이 함수로 현재 배열을 읽는다.
export function getPosts() {
  return posts;  
}

// 기존 배열을 수정하지 않고, 새 글을 앞에 둔 새 배열로 바꾼다.
export function addPost(post) {
  posts= [post, ...posts];  
}

