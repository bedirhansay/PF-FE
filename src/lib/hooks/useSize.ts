import { useEffect, useState } from "react";
export const useSize = () => {
  const [width, setWidth] = useState(9999);
  const [height, setHeight] = useState(9999);
  useEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return [width, height];
};
