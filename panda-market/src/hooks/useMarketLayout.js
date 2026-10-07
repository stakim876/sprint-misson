import { useEffect, useState } from "react";

// 너비에 따라 한 페이지 개수와 베스트 개수가 같이 바뀐다.
// useState에 함수를 넘기면 React가 그 함수를 처음 한 번만 호출해 초기값을 만든다.
function getLayout() {
  const width = window.innerWidth;
  if (width <= 768) return { pageSize: 4, bestSize: 1 };
  if (width <= 1200) return { pageSize: 6, bestSize: 2 };
  return { pageSize: 10, bestSize: 4 };  
}

export function useMarketLayout() {
  const [layout, setLayout] = useState(getLayout);
  
  useEffect(() => {
    function handleResize() {
      setLayout(getLayout());  
    }
    window.addEventListener("resize", handleResize);
    // cleanup에서 리스너를 떼야 언마운트 뒤에도 resize가 이 컴포넌트를 갱신하지 않는다.
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return layout;
}