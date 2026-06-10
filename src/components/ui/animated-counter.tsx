"use client";

import { useRef, useState, useEffect } from "react";
import { useInView, animate } from "framer-motion";

type AnimatedCounterProps = {
  from?: number;
  to: number;
  suffix?: string;
  decimals?: number;
  formatter?: (value: number) => string;
};

export function AnimatedCounter({
  from = 0,
  to,
  suffix = "",
  decimals = 0,
  formatter,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(from, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setCount(v),
    });
    return () => controls.stop();
  }, [inView, from, to]);

  const display = formatter
    ? formatter(count)
    : `${count.toFixed(decimals)}${suffix}`;

  return <span ref={ref}>{display}</span>;
}
