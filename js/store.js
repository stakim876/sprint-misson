const Store = (() => {
  const KEYS = {
    users: "panda_users",
    session: "panda_session",
    products: "panda_products",
    posts: "panda_posts",
  };

  const PRODUCT_SEED = [
    {
      id: "p1",
      name: "아이폰 14 Pro",
      price: 980000,
      favoriteCount: 24,
      color: "#c7d2fe",
      description:
        "상태 좋은 아이폰 14 Pro 판매합니다.\n기스 거의 없고 배터리 상태도 양호해요.\n구성품은 본체와 충전기 포함입니다.",
      tags: ["전자기기", "스마트폰", "애플"],
      image: "",
      likedBy: [],
      comments: [],
      createdAt: "2024-04-12T10:00:00.000Z",
    },
    {
      id: "p2",
      name: "맥북 에어 M2",
      price: 1250000,
      favoriteCount: 18,
      color: "#bbf7d0",
      description: "맥북 에어 M2 판매합니다. 사용감 적고 성능 좋아요.",
      tags: ["노트북", "애플"],
      image: "",
      likedBy: [],
      comments: [],
      createdAt: "2024-04-11T10:00:00.000Z",
    },
    {
      id: "p3",
      name: "에어팟 프로 2",
      price: 220000,
      favoriteCount: 31,
      color: "#fecaca",
      description: "에어팟 프로 2세대, 케이스 포함입니다.",
      tags: ["이어폰", "애플"],
      image: "",
      likedBy: [],
      comments: [],
      createdAt: "2024-04-10T10:00:00.000Z",
    },
    {
      id: "p4",
      name: "나이키 운동화",
      price: 89000,
      favoriteCount: 12,
      color: "#fde68a",
      description: "사이즈 270, 실착 3회입니다.",
      tags: ["신발", "나이키"],
      image: "",
      likedBy: [],
      comments: [],
      createdAt: "2024-04-09T10:00:00.000Z",
    },
    {
      id: "p5",
      name: "아이패드 에어",
      price: 650000,
      favoriteCount: 9,
      color: "#ddd6fe",
      description: "아이패드 에어, 펜슬 미포함.",
      tags: ["태블릿", "애플"],
      image: "",
      likedBy: [],
      comments: [],
      createdAt: "2024-04-08T10:00:00.000Z",
    },
    {
      id: "p6",
      name: "갤럭시 워치",
      price: 180000,
      favoriteCount: 15,
      color: "#a5f3fc",
      description: "갤럭시 워치 상태 양호합니다.",
      tags: ["웨어러블", "삼성"],
      image: "",
      likedBy: [],
      comments: [],
      createdAt: "2024-04-07T10:00:00.000Z",
    },
    {
      id: "p7",
      name: "로지텍 마우스",
      price: 45000,
      favoriteCount: 7,
      color: "#fbcfe8",
      description: "로지텍 무선 마우스입니다.",
      tags: ["주변기기"],
      image: "",
      likedBy: [],
      comments: [],
      createdAt: "2024-04-06T10:00:00.000Z",
    },
    {
      id: "p8",
      name: "기계식 키보드",
      price: 120000,
      favoriteCount: 21,
      color: "#bfdbfe",
      description: "청축 기계식 키보드입니다.",
      tags: ["키보드"],
      image: "",
      likedBy: [],
      comments: [],
      createdAt: "2024-04-05T10:00:00.000Z",
    },
    {
      id: "p9",
      name: "모니터 27인치",
      price: 310000,
      favoriteCount: 11,
      color: "#d9f99d",
      description: "27인치 FHD 모니터입니다.",
      tags: ["모니터"],
      image: "",
      likedBy: [],
      comments: [],
      createdAt: "2024-04-04T10:00:00.000Z",
    },
    {
      id: "p10",
      name: "블루투스 스피커",
      price: 56000,
      favoriteCount: 6,
      color: "#fed7aa",
      description: "휴대용 블루투스 스피커입니다.",
      tags: ["스피커"],
      image: "",
      likedBy: [],
      comments: [],
      createdAt: "2024-04-03T10:00:00.000Z",
    },
  ];

  const POST_SEED = [
    {
      id: "b1",
      title: "판다마켓 꿀팁 공유합니다",
      author: "판다",
      authorEmail: "",
      content:
        "안녕하세요! 판다마켓을 이용하면서 도움이 됐던 팁을 공유해요.\n\n1. 상품 사진은 밝은 곳에서 여러 장 찍어보세요.\n2. 태그를 잘 달면 검색에 잘 노출됩니다.\n3. 가격은 비슷한 매물을 참고하면 좋아요.\n\n모두 좋은 거래 하세요!",
      like: 12,
      likedBy: [],
      comments: [
        {
          id: "bc1",
          author: "코드잇",
          text: "좋은 정보 감사합니다!",
          date: "2024. 04. 12",
        },
        {
          id: "bc2",
          author: "스프린터",
          text: "태그 팁이 특히 유익했어요.",
          date: "2024. 04. 13",
        },
      ],
      createdAt: "2024-04-12T09:00:00.000Z",
    },
    {
      id: "b2",
      title: "중고거래 사기 예방 체크리스트",
      author: "코드잇",
      authorEmail: "",
      content: "직거래를 우선하고, 입금 전 상대를 꼭 확인하세요.",
      like: 20,
      likedBy: [],
      comments: [],
      createdAt: "2024-04-10T09:00:00.000Z",
    },
    {
      id: "b3",
      title: "이번 주 추천 매물 모음",
      author: "스프린터",
      authorEmail: "",
      content: "이번 주 인기 매물을 모아봤습니다.",
      like: 8,
      likedBy: [],
      comments: [],
      createdAt: "2024-04-08T09:00:00.000Z",
    },
    {
      id: "b4",
      title: "노트북 판매 후기",
      author: "미니",
      authorEmail: "",
      content: "노트북 판매했는데 빠르게 거래됐어요.",
      like: 5,
      likedBy: [],
      comments: [],
      createdAt: "2024-04-05T09:00:00.000Z",
    },
    {
      id: "b5",
      title: "처음 오신 분들 환영합니다",
      author: "관리자",
      authorEmail: "",
      content: "판다마켓에 오신 것을 환영합니다!",
      like: 30,
      likedBy: [],
      comments: [],
      createdAt: "2024-04-01T09:00:00.000Z",
    },
  ];

  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  }

  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function uid(prefix) {
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  }

  function ensureSeed() {
    if (!localStorage.getItem(KEYS.products)) write(KEYS.products, PRODUCT_SEED);
    if (!localStorage.getItem(KEYS.posts)) write(KEYS.posts, POST_SEED);
    if (!localStorage.getItem(KEYS.users)) write(KEYS.users, []);
  }

  ensureSeed();

  return {
    uid,
    formatPrice(price) {
      return Number(price).toLocaleString("ko-KR") + "원";
    },
    formatDate(iso) {
      const d = iso ? new Date(iso) : new Date();
      if (Number.isNaN(d.getTime())) return "";
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}. ${m}. ${day}`;
    },
    getUsers() {
      return read(KEYS.users, []);
    },
    saveUsers(users) {
      write(KEYS.users, users);
    },
    getSession() {
      return read(KEYS.session, null);
    },
    setSession(user) {
      if (!user) {
        localStorage.removeItem(KEYS.session);
        return;
      }
      write(KEYS.session, {
        email: user.email,
        nickname: user.nickname,
      });
    },
    getCurrentUser() {
      return this.getSession();
    },
    signup({ email, nickname, password }) {
      const users = this.getUsers();
      if (users.some((u) => u.email === email)) {
        throw new Error("이미 사용 중인 이메일입니다.");
      }
      const user = { email, nickname, password };
      users.push(user);
      this.saveUsers(users);
      this.setSession(user);
      return user;
    },
    login({ email, password }) {
      const user = this.getUsers().find((u) => u.email === email && u.password === password);
      if (!user) throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
      this.setSession(user);
      return user;
    },
    socialLogin(provider) {
      const email = `${provider.toLowerCase()}@social.local`;
      const users = this.getUsers();
      let user = users.find((u) => u.email === email);
      if (!user) {
        user = {
          email,
          nickname: provider,
          password: uid("social"),
        };
        users.push(user);
        this.saveUsers(users);
      }
      this.setSession(user);
      return user;
    },
    logout() {
      this.setSession(null);
    },
    getProducts() {
      return read(KEYS.products, PRODUCT_SEED);
    },
    saveProducts(products) {
      write(KEYS.products, products);
    },
    getProduct(id) {
      return this.getProducts().find((p) => p.id === id) || null;
    },
    upsertProduct(product) {
      const products = this.getProducts();
      const idx = products.findIndex((p) => p.id === product.id);
      if (idx >= 0) products[idx] = product;
      else products.unshift(product);
      this.saveProducts(products);
      return product;
    },
    getPosts() {
      return read(KEYS.posts, POST_SEED);
    },
    savePosts(posts) {
      write(KEYS.posts, posts);
    },
    getPost(id) {
      return this.getPosts().find((p) => p.id === id) || null;
    },
    upsertPost(post) {
      const posts = this.getPosts();
      const idx = posts.findIndex((p) => p.id === post.id);
      if (idx >= 0) posts[idx] = post;
      else posts.unshift(post);
      this.savePosts(posts);
      return post;
    },
    deletePost(id) {
      this.savePosts(this.getPosts().filter((p) => p.id !== id));
    },
  };
})();
