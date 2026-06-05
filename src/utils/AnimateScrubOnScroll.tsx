"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, easeOut } from "framer-motion";

const AnimateScrubOnScroll = ({ children }: any) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.75"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, 0], { ease: easeOut });

  return (
    <div ref={ref}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
};

export default AnimateScrubOnScroll;

