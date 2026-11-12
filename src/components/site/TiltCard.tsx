import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** 3D tilt with a moving copper sheen that follows the pointer. */
export function TiltCard({ children, className, max = 10 }: { children: ReactNode; className?: string; max?: number }) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 150, damping: 18 });
  const sy = useSpring(py, { stiffness: 150, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const gx = useTransform(sx, (v) => `${v * 100}%`);
  const gy = useTransform(sy, (v) => `${v * 100}%`);
  const sheen = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, oklch(0.83 0.105 78 / 22%), transparent 55%)`;

  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div
        className="relative h-full w-full"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width);
          py.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          px.set(0.5);
          py.set(0.5);
        }}
      >
        {children}
        <motion.div className={cn("pointer-events-none absolute inset-0 rounded-[inherit]")} style={{ background: sheen }} />
      </motion.div>
    </div>
  );
}
