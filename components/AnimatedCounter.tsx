"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-50px",
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 1400;
    const start = performance.now();

    let rafId = 0;

    const tick = (time: number) => {
      const progress = Math.min(
        1,
        (time - start) / duration
      );

      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(eased * value));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [inView, value]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="tabular-nums"
    >
      {count.toLocaleString()}
      {suffix}
    </motion.span>
  );
}