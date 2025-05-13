import useResizeObserver from "@react-hook/resize-observer";
import React, { useRef, useState } from "react";

const useContainerSize = () => {
  const targetRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useResizeObserver(targetRef, (entry) => {
    setSize({
      width: entry.contentRect.width,
      height: entry.contentRect.height,
    });
  });

  return [targetRef, size];
};

export default useContainerSize;
