import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("nocturne-loaded")) {
      setDone(true);
      return;
    }
    let n = 0;
    const id = setInterval(() => {
      n = Math.min(100, n + Math.ceil(Math.random() * 9));
      setCount(n);
      if (n >= 100) {
        clearInterval(id);
        setTimeout(() => {
          setDone(true);
          sessionStorage.setItem("nocturne-loaded", "1");
        }, 450);
      }
    }, 55);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-background"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="overflow-hidden">
            <motion.h1
              className="display-lg italic-serif text-foreground"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              Nocturne
            </motion.h1>
          </div>
          <p className="eyebrow mt-6">Coffee Atelier · Est. 2014</p>
          <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Roasting</span>
            <span className="font-display text-7xl font-light tabular-nums text-primary md:text-9xl">
              {count}
            </span>
          </div>
          <motion.div
            className="absolute bottom-0 left-0 h-px bg-primary"
            style={{ width: `${count}%` }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
