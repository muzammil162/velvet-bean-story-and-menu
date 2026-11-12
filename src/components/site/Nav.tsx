import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBagCount } from "@/lib/bag";

const links = [
  { to: "/collections", label: "Collections" },
  { to: "/story", label: "Story" },
  { to: "/menu", label: "Menu" },
  { to: "/stores", label: "Stores" },
] as const;

export function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const count = useBagCount();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(v > prev && v > 200 && !open);
    setSolid(v > 40);
  });

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-[background,border-color] duration-500",
          solid && !open ? "glass border-b border-border" : "border-b border-transparent",
        )}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
          <Link to="/" className="group flex items-baseline gap-2" aria-label="Nocturne home">
            <span className="font-display text-2xl italic tracking-tight">Nocturne</span>
            <span className="hidden text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:inline">
              Coffee Atelier
            </span>
          </Link>

          <ul className="hidden items-center gap-10 md:flex">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="link-underline text-xs uppercase tracking-[0.25em] text-foreground/75 transition-colors hover:text-foreground"
                  activeProps={{ className: "text-primary" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <Link
              to="/collections"
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors hover:border-primary"
              aria-label={`Bag, ${count} items`}
            >
              <ShoppingBag className="h-4 w-4" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <button
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-border md:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <motion.span className="block h-px w-5 bg-foreground" animate={{ rotate: open ? 45 : 0, y: open ? 3.5 : 0 }} />
              <motion.span className="block h-px w-5 bg-foreground" animate={{ rotate: open ? -45 : 0, y: open ? -3.5 : 0 }} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col justify-center bg-background px-8"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-4">
              {[{ to: "/", label: "Home" } as const, ...links].map((l, i) => (
                <li key={l.to} className="overflow-hidden">
                  <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.25 + i * 0.07, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                    <Link to={l.to} className="font-display text-5xl font-light italic" activeProps={{ className: "text-primary" }}>
                      {l.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
