import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Clock, MapPin, Phone } from "lucide-react";

import store from "@/assets/store-interior.jpg";
import { PageHero } from "@/components/site/PageHero";
import { FadeUp, SplitText } from "@/components/site/Reveal";
import { stores } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/stores")({
  head: () => ({
    meta: [
      { title: "Stores & Hours — Nocturne Coffee Atelier" },
      { name: "description", content: "Visit Nocturne in Lisbon, Kyoto, Brooklyn and Karachi. Addresses, opening hours and contact details for every café." },
      { property: "og:title", content: "Stores & Hours — Nocturne Coffee Atelier" },
      { property: "og:description", content: "Nocturne cafés in Lisbon, Kyoto, Brooklyn and Karachi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Stores,
});

function DotMap({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  // stylised dotted world grid
  const dots = useMemo(() => {
    const out: { x: number; y: number }[] = [];
    for (let y = 8; y < 92; y += 3.2) {
      for (let x = 2; x < 98; x += 1.6) {
        const n = Math.sin(x * 0.18) * Math.cos(y * 0.22) + Math.sin((x + y) * 0.07);
        const land =
          (x > 14 && x < 34 && y > 18 && y < 58) ||
          (x > 26 && x < 38 && y > 55 && y < 88) ||
          (x > 42 && x < 56 && y > 18 && y < 45) ||
          (x > 45 && x < 60 && y > 42 && y < 80) ||
          (x > 56 && x < 90 && y > 16 && y < 56) ||
          (x > 78 && x < 92 && y > 64 && y < 82);
        if (land && n > -0.6) out.push({ x, y });
      }
    }
    return out;
  }, []);

  return (
    <div className="relative aspect-[2/1] w-full overflow-hidden rounded-3xl border border-border bg-card">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={0.35} className="fill-foreground/20" />
        ))}
      </svg>
      {stores.map((s, i) => (
        <button
          key={s.city}
          onClick={() => onSelect(i)}
          className="group absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${s.coords.x}%`, top: `${s.coords.y}%` }}
          aria-label={`Show ${s.city}`}
        >
          <span className={cn("absolute inset-0 rounded-full bg-primary", i === active ? "animate-pulse-ring" : "opacity-0")} />
          <span className={cn("relative block rounded-full border-2 border-background transition-all duration-500", i === active ? "h-5 w-5 bg-primary" : "h-3 w-3 bg-accent group-hover:scale-150")} />
          <span className={cn("absolute left-1/2 top-7 -translate-x-1/2 whitespace-nowrap font-display text-sm italic transition-opacity md:text-lg", i === active ? "text-primary opacity-100" : "opacity-60")}>
            {s.city}
          </span>
        </button>
      ))}
    </div>
  );
}

function Stores() {
  const [active, setActive] = useState(0);
  const s = stores[active]!;

  return (
    <>
      <PageHero
        eyebrow="Stores"
        title="Find us"
        italic="after hours."
        image={store}
        intro="Four rooms across four cities — each with warm light, a long bar and a seat waiting for you."
      />

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <p className="eyebrow mb-6">Around the world</p>
        <SplitText text="Pick a city, pull up a stool." className="display-md mb-14" />
        <DotMap active={active} onSelect={setActive} />

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <ul className="lg:col-span-5">
            {stores.map((st, i) => (
              <li key={st.city}>
                <button
                  onClick={() => setActive(i)}
                  className="group relative flex w-full items-center justify-between border-b border-border py-6 text-left"
                >
                  <span className={cn("font-display text-4xl font-light transition-all duration-500", i === active ? "translate-x-3 italic text-primary" : "text-foreground/60 group-hover:text-foreground")}>
                    {st.city}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{st.hours[0]?.time}</span>
                  {i === active && <motion.span layoutId="store-bar" className="absolute bottom-[-1px] left-0 h-px w-full bg-primary" />}
                </button>
              </li>
            ))}
          </ul>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={s.city}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-12"
              >
                <div className="glow absolute -right-32 -top-32 h-80 w-80" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-primary" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                    </span>
                    <span className="text-xs uppercase tracking-[0.25em] text-primary">Open today</span>
                  </div>
                  <h3 className="mt-6 font-display text-4xl font-light italic md:text-5xl">{s.name}</h3>
                  <p className="mt-3 text-foreground/70">{s.note}</p>

                  <div className="mt-10 grid gap-8 sm:grid-cols-2">
                    <div className="flex gap-4">
                      <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <p className="text-foreground/85">{s.address}</p>
                    </div>
                    <div className="flex gap-4">
                      <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <p className="text-foreground/85">{s.phone}</p>
                    </div>
                    <div className="flex gap-4 sm:col-span-2">
                      <Clock className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <div className="w-full space-y-2">
                        {s.hours.map((h) => (
                          <div key={h.days} className="flex items-end gap-3">
                            <span>{h.days}</span>
                            <span className="dotted-leader mb-1.5 h-2 flex-1" />
                            <span className="font-display text-lg">{h.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28 md:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { t: "Private tastings", d: "Book the slow bar for up to eight guests, after closing." },
            { t: "Roastery tours", d: "Every Saturday night in Lisbon. Watch a batch drop." },
            { t: "Wholesale", d: "Bring Nocturne to your restaurant, hotel or office." },
          ].map((c, i) => (
            <FadeUp key={c.t} delay={i * 0.1}>
              <div className="h-full rounded-3xl border border-border p-8 transition-colors duration-500 hover:bg-card">
                <h4 className="font-display text-3xl font-light">{c.t}</h4>
                <p className="mt-4 text-muted-foreground">{c.d}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
    </>
  );
}
