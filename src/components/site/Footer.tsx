import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { Magnetic } from "./Magnetic";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-40%", "0%"]);
  const [email, setEmail] = useState("");

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 pb-10 pt-24 md:grid-cols-12 md:px-10">
        <div className="md:col-span-6">
          <p className="eyebrow mb-6">The Night Letter</p>
          <h3 className="display-md max-w-md">
            Fresh roasts, <span className="italic-serif text-primary">first.</span>
          </h3>
          <form
            className="mt-10 flex max-w-md items-center gap-3 border-b border-foreground/30 pb-3 focus-within:border-primary"
            onSubmit={(e) => {
              e.preventDefault();
              if (!/^\S+@\S+\.\S+$/.test(email)) {
                toast.error("Please enter a valid email.");
                return;
              }
              toast.success("Welcome to the night shift ☕", { description: "Your first letter arrives Sunday." });
              setEmail("");
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              aria-label="Email address"
              className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground/60"
            />
            <Magnetic>
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110" aria-label="Subscribe">
                <ArrowUpRight className="h-5 w-5" />
              </button>
            </Magnetic>
          </form>
        </div>

        <div className="grid grid-cols-2 gap-10 md:col-span-6 md:grid-cols-3">
          <div>
            <p className="eyebrow mb-5">Explore</p>
            <ul className="space-y-3 text-foreground/80">
              <li><Link to="/collections" className="link-underline">Collections</Link></li>
              <li><Link to="/story" className="link-underline">Our Story</Link></li>
              <li><Link to="/menu" className="link-underline">Menu</Link></li>
              <li><Link to="/stores" className="link-underline">Stores</Link></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-5">Social</p>
            <ul className="space-y-3 text-foreground/80">
              <li><a href="#" className="link-underline">Instagram</a></li>
              <li><a href="#" className="link-underline">Pinterest</a></li>
              <li><a href="#" className="link-underline">Spotify</a></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="eyebrow mb-5">Roastery</p>
            <p className="text-foreground/80">Rua da Escola Politécnica 42<br />Lisbon, Portugal</p>
            <p className="mt-3 text-sm text-muted-foreground">Open daily, 7 — late</p>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <motion.p
          style={{ y }}
          className="select-none whitespace-nowrap text-center font-display text-[22vw] font-light italic leading-[0.8] tracking-tighter outline-text"
        >
          Nocturne
        </motion.p>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-6 py-6 text-xs text-muted-foreground md:flex-row md:px-10">
        <span>© {new Date().getFullYear()} Nocturne Coffee Atelier</span>
        <span>Roasted after dark, served all day.</span>
      </div>
    </footer>
  );
}
