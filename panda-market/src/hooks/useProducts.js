import { getItems } from "../data/items";

// 공용 API 목록은 다른 사람 테스트 글이라 이름과 사진이 상품이 아니다.
// 미션 상품은 이름과 사진이 짝으로 들어 있는 items.js를 보여 준다.
export function useProducts({ page, pageSize, orderBy, keyword }) {
  const query = (keyword || "").trim().toLowerCase();
  const matched = getItems().filter((item) =>
    query ? item.name.toLowerCase().includes(query) : true
  );
  const sorted =
    orderBy === "favorite"
      ? [...matched].sort((a, b) => b.favoriteCount - a.favoriteCount)
      : matched;
  const start = (page - 1) * pageSize;

  return {
    products: sorted.slice(start, start + pageSize),
    totalCount: sorted.length,
    loading: false,
    error: "",
  };
}
