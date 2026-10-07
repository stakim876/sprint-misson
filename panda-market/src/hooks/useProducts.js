import { getItems } from "../data/items";

// 중고마켓 목록은 items.js다. keyword, 정렬, 페이지는 여기서 잘라 화면에 넘긴다.
export function useProducts({ page, pageSize, orderBy, keyword }) {
  const matched = getItems().filter((item) =>
    keyword ? item.name.includes(keyword) : true
  );
  // favorite 정렬은 원본을 바꾸지 않도록 복사본에서 한다.
  const sorted =
    orderBy === "favorite"
      ? [...matched].sort((a, b) => b.favoriteCount - a.favoriteCount)
      : matched;
  // 시작 인덱스는 (현재 페이지 - 1) * pageSize 다.
  const start = (page - 1) * pageSize;

  return {
    products: sorted.slice(start, start + pageSize),
    totalCount: sorted.length,
    loading: false,
    error: "",
  };
}
