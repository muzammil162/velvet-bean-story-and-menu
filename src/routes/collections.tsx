import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import roaster from "@/assets/story-roaster.jpg";
import { PageHero } from "@/components/site/PageHero";
import { TiltCard } from "@/components/site/TiltCard";
import { RoastMeter } from "@/components/site/RoastMeter";
import { FadeUp, SplitText } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { products, type Product } from "@/lib/data";
import { bag } from "@/lib/bag";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Coffee Collections — Nocturne" },
      { name: "description", content: "Shop Nocturne single origins, signature blends and limited seasonal releases. Roasted in small batches, shipped within 48 hours." },
      { property: "og:title", content: "Coffee Collections — Nocturne" },
      { property: "og:description", content: "Single origins, signature blends and limited releases, roasted after dark." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Collections,
});

const filters = ["All", "Single Origin", "Signature Blend", "Limited"] as const;
const roastLabels = ["", "Light", "Light-medium", "Medium", "Medium-dark", "Dark"];

function addToBag(p: Product) {
  bag.add();
  toast.success(`${p.name} added to your bag`, { description: "250g · Whole bean" });
}

function Collections() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [quick, setQuick] = useState<Product | null>(null);
  const [roast, setRoast] = useState(3);

  const list = useMemo(() => products.filter((p) => filter === "All" || p.category === filter), [filter]);
  const match = useMemo(
    () => [...products].sort((a, b) => Math.abs(a.roast - roast) - Math.abs(b.roast - roast))[0]!,
    [roast],
  );

  return (
    <>
      <PageHero
        eyebrow="The Collections"
        title="Coffee worth"
        italic="staying up for."
        image={roaster}
        intro="Every bag is roasted to order, rested, and shipped within 48 hours. Choose a single origin or let our blends carry you through the night."
      />

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="mb-14 flex flex-wrap gap-3">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "relative rounded-full border border-border px-6 py-3 text-xs uppercase tracking-[0.2em] transition-colors",
                filter === f ? "text-primary-foreground" : "text-foreground/70 hover:text-foreground",
              )}
            >
              {filter === f && (
                <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              )}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.article
                layout
                key={p.slug}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
                className="group"
              >
                <TiltCard className="aspect-[4/5]" max={8}>
                  <button
                    onClick={() => setQuick(p)}
                    data-cursor="View"
                    className="relative block h-full w-full overflow-hidden rounded-3xl text-left shadow-elegant"
                    aria-label={`Quick view ${p.name}`}
                  >
                    <img src={p.image} alt={`${p.name} coffee bag`} loading="lazy" width={1024} height={1280} className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110" />
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background via-background/30 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <div className="flex translate-y-6 flex-wrap gap-2 transition-transform duration-500 group-hover:translate-y-0">
                        {p.notes.map((n) => (
                          <span key={n} className="glass rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-wider">{n}</span>
                        ))}
                      </div>
                    </div>
                    <span className="glass absolute left-5 top-5 rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-[0.2em]">{p.category}</span>
                  </button>
                </TiltCard>
                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-light transition-colors group-hover:text-primary">{p.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.origin}</p>
                    <RoastMeter level={p.roast} className="mt-4" />
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span className="font-display text-2xl">${p.price}</span>
                    <button
                      onClick={() => addToBag(p)}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-all duration-500 hover:rotate-90 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                      aria-label={`Add ${p.name} to bag`}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Roast finder */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-28 md:grid-cols-2 md:px-10">
          <div>
            <p className="eyebrow mb-6">Roast Finder</p>
            <SplitText text="How do you like your night?" className="display-md" />
            <p className="mt-6 max-w-md text-foreground/70">Slide from bright and floral to deep and chocolatey — we’ll pour you a match.</p>
            <div className="mt-12 max-w-md">
              <Slider min={1} max={5} step={1} value={[roast]} onValueChange={(v) => setRoast(v[0] ?? 3)} aria-label="Roast preference" />
              <div className="mt-4 flex justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span>Bright</span>
                <span className="text-primary">{roastLabels[roast]}</span>
                <span>Bold</span>
              </div>
            </div>
          </div>
          <FadeUp>
            <AnimatePresence mode="wait">
              <motion.div
                key={match.slug}
                initial={{ opacity: 0, rotateY: -25, x: 40 }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={{ opacity: 0, rotateY: 25, x: -40 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-8 rounded-3xl border border-border bg-background p-6"
                style={{ perspective: 1000 }}
              >
                <img src={match.image} alt={match.name} loading="lazy" className="h-48 w-36 rounded-2xl object-cover" />
                <div>
                  <p className="eyebrow">Your match</p>
                  <h3 className="mt-3 font-display text-3xl italic">{match.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{match.notes.join(" · ")}</p>
                  <Button variant="copper" className="mt-5 h-11 px-6" onClick={() => addToBag(match)}>
                    <Plus /> Add · ${match.price}
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </FadeUp>
        </div>
      </section>

      <Dialog open={!!quick} onOpenChange={(o) => !o && setQuick(null)}>
        <DialogContent className="max-w-3xl overflow-hidden border-border bg-card p-0 sm:rounded-3xl">
          {quick && (
            <div className="grid md:grid-cols-2">
              <img src={quick.image} alt={quick.name} className="h-72 w-full object-cover md:h-full" />
              <div className="p-8">
                <p className="eyebrow">{quick.origin}</p>
                <DialogTitle className="mt-3 font-display text-4xl font-light italic">{quick.name}</DialogTitle>
                <DialogDescription className="mt-4 text-foreground/70">{quick.blurb}</DialogDescription>
                <div className="mt-6 grid grid-cols-2 gap-4 border-y border-border py-5 text-sm">
                  <div><p className="text-muted-foreground">Altitude</p><p className="mt-1">{quick.altitude}</p></div>
                  <div><p className="text-muted-foreground">Process</p><p className="mt-1">{quick.process}</p></div>
                </div>
                <p className="mt-5 text-sm text-muted-foreground">Tasting notes</p>
                <p className="mt-1">{quick.notes.join(" · ")}</p>
                <RoastMeter level={quick.roast} className="mt-5" />
                <Button variant="copper" size="xl" className="mt-8 w-full" onClick={() => { addToBag(quick); setQuick(null); }}>
                  <Plus /> Add to bag · ${quick.price}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
