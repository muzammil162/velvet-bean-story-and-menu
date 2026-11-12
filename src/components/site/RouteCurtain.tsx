import { motion } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const labels: Record<string, string> = {
  "/": "Home",
  "/collections": "Collections",
  "/story": "Our Story",
  "/menu": "Menu",
  "/stores": "Stores",
};

/** Copper curtain that sweeps across the screen whenever the page changes. */
export function RouteCurtain() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const first = useRef(true);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setKey((k) => k + 1);
  }, [pathname]);

  if (key === 0) return null;
  return (
    <motion.div
      key={key}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[110] flex items-center justify-center bg-primary"
      initial={{ clipPath: "inset(0 0 0 0)" }}
      animate={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
    >
      <motion.span
        className="display-md italic-serif text-primary-foreground"
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
      >
        {labels[pathname] ?? "Nocturne"}
      </motion.span>
    </motion.div>
  );
}
