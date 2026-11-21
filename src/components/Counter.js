"use client";

import { useEffect, useRef, useState } from "react";

const format = (n) => n.toLocaleString("en-US");

export default function Counter({ title, to, suffix = "+", duration = 2000 }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    let frame;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          // jQuery "swing" easing, as used by the original counter animation
          const eased = 0.5 - Math.cos(p * Math.PI) / 2;
          setValue(Math.round(eased * to));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return (
    <div className="counter" ref={ref}>
      <div className="counter-title">{title}</div>
      <div className="counter-number-wrapper">
        <span className="counter-prefix"></span>
        <span className="counter-number">{format(value)}</span>
        <span className="counter-suffix">{suffix}</span>
      </div>
    </div>
  );
}
