import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

import farm from "@/assets/farm-cherries.jpg";
import roaster from "@/assets/story-roaster.jpg";
import latte from "@/assets/latte-art.jpg";
import store from "@/assets/store-interior.jpg";
import beans from "@/assets/beans.png";
import { PageHero } from "@/components/site/PageHero";
import { FadeUp, ParallaxImage, ScrollWords, SplitText } from "@/components/site/Reveal";
import { VelocityMarquee } from "@/components/site/Marquee";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — Nocturne Coffee Atelier" },
      { name: "description", content: "From a midnight roasting experiment in a Lisbon garage to four cafés worldwide. The people, farms and rituals behind Nocturne." },
      { property: "og:title", content: "Our Story — Nocturne Coffee Atelier" },
      { property: "og:description", content: "The people, farms and late-night rituals behind Nocturne." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Story,
});

const chapters = [
  { year: "2014", title: "A garage in Lisbon", text: "Two night-shift nurses, one borrowed roaster and a stubborn idea: coffee should taste of somewhere.", img: roaster },
  { year: "2016", title: "Up the mountain", text: "We travelled to Gedeo and Huila and shook hands on our first direct-trade partnerships — paying 40% above fair-trade.", img: farm },
  { year: "2019", title: "The first room", text: "Príncipe Real opened its doors at 7pm. We stayed open until the last guest left. We still do.", img: store },
  { year: "2026", title: "Four cities, one sky", text: "Lisbon, Kyoto, Brooklyn, Karachi. Different streets, the same quiet ritual of the late pour.", img: latte },
];

const values = [
  { k: "Direct", t: "Trade", d: "We know every farmer by name and pay them before the harvest." },
  { k: "Slow", t: "Roast", d: "Low-flame profiles that coax sweetness instead of forcing it." },
  { k: "Zero", t: "Waste", d: "Compostable bags, chaff to gardens, grounds to local farms." },
];

function Story() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="Born at midnight,"
        italic="raised by hand."
        image={farm}
        intro="Nocturne began with a simple belief: the best things happen when the world is quiet."
      />

      <section className="mx-auto max-w-5xl px-6 py-32 md:px-10">
        <ScrollWords
          className="font-display text-3xl font-light leading-[1.25] md:text-5xl"
          text="We roast while the city sleeps — because patience is an ingredient, and the night has plenty of it. Every bean is traceable, every farmer is a partner, every cup is a small act of care."
        />
      </section>

      <Timeline />

      <VelocityMarquee items={["Direct Trade", "Slow Roast", "Zero Waste", "Night Ritual"]} className="border-y border-border" baseVelocity={-3} />

      <section className="mx-auto max-w-7xl px-6 py-32 md:px-10">
        <p className="eyebrow mb-6">What we stand for</p>
        <SplitText text="Three promises, kept nightly." className="display-lg mb-20" />
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <FadeUp key={v.k} delay={i * 0.12}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-10 transition-colors duration-700 hover:border-primary">
                <div className="glow absolute -right-20 -top-20 h-60 w-60 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <span className="text-xs tabular-nums text-muted-foreground">0{i + 1}</span>
                <h3 className="mt-16 font-display text-5xl font-light">
                  {v.k} <span className="italic text-primary">{v.t}</span>
                </h3>
                <p className="mt-6 text-foreground/70">{v.d}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <Collage />

      <section className="mx-auto max-w-4xl px-6 pb-32 text-center md:px-10">
        <SplitText text="Come taste the story." className="display-lg justify-center" />
        <FadeUp delay={0.3} className="mt-10 flex justify-center gap-4">
          <Button asChild variant="copper" size="xl"><Link to="/collections">Shop coffee <ArrowRight /></Link></Button>
          <Button asChild variant="line" size="xl"><Link to="/stores">Visit a store</Link></Button>
        </FadeUp>
      </section>
    </>
  );
}

function Timeline() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 30 });
  return (
    <section ref={ref} className="relative mx-auto max-w-7xl px-6 pb-32 md:px-10">
      <div className="absolute bottom-0 left-6 top-0 w-px bg-foreground/10 md:left-1/2">
        <motion.div className="h-full w-full origin-top bg-primary" style={{ scaleY }} />
      </div>
      <div className="space-y-32">
        {chapters.map((c, i) => (
          <div key={c.year} className={`relative grid items-center gap-10 pl-10 md:grid-cols-2 md:gap-24 md:pl-0 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <span className="absolute left-6 top-6 h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-copper md:left-1/2" />
            <ParallaxImage src={c.img} alt={c.title} className="aspect-[4/3] w-full rounded-3xl" />
            <FadeUp>
              <span className="font-display text-8xl font-light italic text-gradient-copper md:text-9xl">{c.year}</span>
              <h3 className="display-md mt-4">{c.title}</h3>
              <p className="mt-6 max-w-md text-lg text-foreground/70">{c.text}</p>
            </FadeUp>
          </div>
        ))}
      </div>
    </section>
  );
}

function Collage() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-60, 160]);
  const y3 = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const rot = useTransform(scrollYProgress, [0, 1], [-30, 60]);
  return (
    <section ref={ref} className="relative mx-auto h-[110vh] max-w-7xl overflow-hidden px-6 md:px-10">
      <motion.img style={{ y: y1 }} src={roaster} alt="" loading="lazy" className="absolute left-[4%] top-[10%] w-[45%] rounded-3xl shadow-elegant" />
      <motion.img style={{ y: y2 }} src={latte} alt="" loading="lazy" className="absolute right-[6%] top-[5%] w-[30%] rounded-3xl shadow-elegant" />
      <motion.img style={{ y: y3 }} src={store} alt="" loading="lazy" className="absolute bottom-[5%] right-[20%] w-[40%] rounded-3xl shadow-elegant" />
      <motion.img style={{ rotate: rot }} src={beans} alt="" aria-hidden className="absolute left-[40%] top-[40%] w-40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="display-xl italic-serif mix-blend-difference">Ritual</h2>
      </div>
    </section>
  );
}
