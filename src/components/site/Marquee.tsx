import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/** Infinite marquee that speeds up and skews with scroll velocity. */
export function VelocityMarquee({
  items,
  baseVelocity = 3,
  className,
}: {
  items: string[];
  baseVelocity?: number;
  className?: string;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const v = useVelocity(scrollY);
  const smooth = useSpring(v, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const skew = useTransform(smooth, [-2000, 2000], [8, -8]);
  const x = useTransform(baseX, (val) => `${wrap(-25, 0, val)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * Math.abs(f);
    baseX.set(baseX.get() + move);
  });

  const row = (
    <>
      {items.map((t, i) => (
        <span key={i} className="flex items-center gap-10 pr-10">
          <span className={i % 2 ? "italic-serif text-gradient-copper" : ""}>{t}</span>
          <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 fill-primary md:h-10 md:w-10">
            <ellipse cx="12" cy="12" rx="7" ry="10" transform="rotate(30 12 12)" />
            <path d="M9 4 Q14 12 9 20" className="fill-none stroke-background" strokeWidth="1.6" transform="rotate(30 12 12)" />
          </svg>
        </span>
      ))}
    </>
  );

  return (
    <div className={cn("overflow-hidden whitespace-nowrap py-6", className)}>
      <motion.div className="flex w-max font-display text-5xl font-light md:text-8xl" style={{ x, skewX: skew }}>
        {row}
        {row}
        {row}
        {row}
      </motion.div>
    </div>
  );
}
