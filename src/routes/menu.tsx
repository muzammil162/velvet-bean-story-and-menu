import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import iced from "@/assets/menu-iced.jpg";
import hero from "@/assets/hero-pour.jpg";
import latte from "@/assets/latte-art.jpg";
import roaster from "@/assets/story-roaster.jpg";
import { PageHero } from "@/components/site/PageHero";
import { FadeUp } from "@/components/site/Reveal";
import { Steam } from "@/components/site/Steam";
import { menu } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Nocturne Coffee Atelier" },
      { name: "description", content: "Espresso, slow-bar pour overs, cold brews and pastries baked at dawn. The Nocturne café menu." },
      { property: "og:title", content: "Menu — Nocturne Coffee Atelier" },
      { property: "og:description", content: "Espresso, slow bar, cold brews and bakery at Nocturne." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Menu,
});

const cats = Object.keys(menu);
const catImages: Record<string, string> = { Espresso: hero, "Slow Bar": roaster, Cold: iced, Bakery: latte };
const catLines: Record<string, string> = {
  Espresso: "Pulled on a hand-built lever machine, dialled in every hour.",
  "Slow Bar": "Unhurried brewing for the curious. Ask us about tonight’s origin.",
  Cold: "Steeped for eighteen hours, served over hand-cut ice.",
  Bakery: "Laminated, proofed and baked before sunrise, every morning.",
};

function Menu() {
  const [cat, setCat] = useState<string>(cats[0]!);

  return (
    <>
      <PageHero
        eyebrow="The Menu"
        title="Poured slowly,"
        italic="sipped slower."
        image={iced}
        intro="From a single perfect ristretto to a siphon brewed at your table — every drink is made to order."
      />

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="sticky top-24 z-20 mx-auto mb-16 flex w-fit max-w-full gap-1 overflow-x-auto rounded-full border border-border p-1.5 glass">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "relative whitespace-nowrap rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.2em] transition-colors md:px-7",
                cat === c ? "text-primary-foreground" : "text-foreground/70 hover:text-foreground",
              )}
            >
              {cat === c && <motion.span layoutId="menu-pill" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-elegant">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={cat}
                    src={catImages[cat]}
                    alt={cat}
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ clipPath: "circle(0% at 50% 50%)", scale: 1.3 }}
                    animate={{ clipPath: "circle(100% at 50% 50%)", scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                  />
                </AnimatePresence>
                <div className="vignette absolute inset-0" />
                <Steam className="absolute left-1/2 top-[10%] h-40 w-32 -translate-x-1/2 opacity-70" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <AnimatePresence mode="wait">
                    <motion.div key={cat} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }}>
                      <h2 className="font-display text-5xl font-light italic">{cat}</h2>
                      <p className="mt-3 max-w-xs text-foreground/75">{catLines[cat]}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.ul
                key={cat}
                initial="hidden"
                animate="show"
                exit="exit"
                variants={{ show: { transition: { staggerChildren: 0.08 } } }}
              >
                {(menu[cat] ?? []).map((item) => (
                  <motion.li
                    key={item.name}
                    variants={{
                      hidden: { opacity: 0, x: 40 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                      exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
                    }}
                    className="group border-b border-border py-8"
                  >
                    <div className="flex items-end gap-4">
                      <h3 className="font-display text-3xl font-light transition-all duration-500 group-hover:italic group-hover:text-primary md:text-4xl">
                        {item.name}
                      </h3>
                      {item.tag && (
                        <span className="mb-2 rounded-full bg-primary/15 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-primary">{item.tag}</span>
                      )}
                      <span className="dotted-leader mb-2 h-2 flex-1" />
                      <span className="font-display text-2xl">${item.price}</span>
                    </div>
                    <p className="mt-2 text-muted-foreground">{item.desc}</p>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>

            <FadeUp className="mt-16 rounded-3xl border border-border bg-card p-8">
              <p className="eyebrow">Good to know</p>
              <p className="mt-4 text-foreground/75">
                Oat, almond and whole milk at no extra cost. Every espresso drink can be made with our decaf Swiss-water Huila. Ask your barista for tonight’s guest origin.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
