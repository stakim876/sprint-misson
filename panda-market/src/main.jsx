import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// createRoot는 #root에 React 트리를 한 번만 붙인다. 이후 화면 변화는 이 트리를 다시 그려서 만든다.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
