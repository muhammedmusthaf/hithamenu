// src/components/ScrollTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // 👈 triggers scroll on route/path change

  return null;
};

export default ScrollTop;
