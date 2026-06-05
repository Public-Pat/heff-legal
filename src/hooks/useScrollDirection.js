import { useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";

const useScrollDirection = () => {
  const { scrollY } = useScroll();
  const [scrollDirection, setScrollDirection] = useState("down");
  const [isAtTop, setIsAtTop] = useState(true);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious();
    const diff = previous !== undefined ? current - previous : 0;
    setScrollDirection(diff > 0 ? "down" : "up");
    setIsAtTop(current <= 20);
  });

  return { isAtTop, scrollDirection };
};

export default useScrollDirection;

