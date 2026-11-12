import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { toast } from "sonner";

import hero from "@/assets/hero-pour.jpg";
import beans from "@/assets/beans.png";
import latte from "@/assets/latte-art.jpg";
import farm from "@/assets/farm-cherries.jpg";
import roaster from "@/assets/story-roaster.jpg";
import iced from "@/assets/menu-iced.jpg";
import store from "@/assets/store-interior.jpg";

import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/site/Magnetic";
import { VelocityMarquee } from "@/components/site/Marquee";
import { FadeUp, ParallaxImage, ScrollWords, SplitText } from "@/components/site/Reveal";
import { Steam } from "@/components/site/Steam";
import { RoastMeter } from "@/components/site/RoastMeter";
import { TiltCard } from "@/components/site/TiltCard";
import { products, stores } from "@/lib/data";
import { bag } from "@/lib/bag";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nocturne — Specialty Coffee Roasted After Dark" },
      {
        name: "description",
        content: "Nocturne is a small-batch coffee atelier. Single origins, signature blends and slow bars in Lisbon, Kyoto, Brooklyn and Karachi.",
      },
      { property: "og:title", content: "Nocturne — Specialty Coffee Roasted After Dark" },
      { property: "og:description", content: "Small-batch single origins and signature blends, roasted after dark." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const silk = [0.22, 1, 0.36, 1] as const;

function Index() {
  return (
    <>
      <Hero />
      <VelocityMarquee
        items={["Single Origin", "Slow Roasted", "Ethically Sourced", "Brewed After Dark"]}
        className="border-y border-border"
      />
      <Manifesto />
      <Showcase />
      <Journey />
      <Stats />
      <MenuTeaser />
      <StoresTeaser />
    </>
  );
}

/* ------------------------------- HERO ------------------------------- */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.35]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const b1 = useTransform(scrollYProgress, [0, 1], [0, -380]);
  const b2 = useTransform(scrollYProgress, [0, 1], [0, -620]);
  const b3 = useTransform(scrollYProgress, [0, 1], [0, -220]);

  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const mxNeg = useTransform(mx, (v) => -v * 0.6);
  const myNeg = useTransform(my, (v) => -v * 0.6);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[680px] overflow-hidden"
      onPointerMove={(e) => {
        mx.set((e.clientX / window.innerWidth - 0.5) * 60);
        my.set((e.clientY / window.innerHeight - 0.5) * 60);
      }}
    >
      <motion.div className="absolute inset-0" style={{ scale: imgScale, y: imgY }}>
        <motion.img
          src={hero}
          alt="Espresso pouring into a black ceramic cup"
          width={1920}
          height={1088}
          className="h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 0.75, scale: 1 }}
          transition={{ duration: 2.2, ease: silk, delay: 0.2 }}
        />
      </motion.div>
      <div className="vignette absolute inset-0" />
      <div className="fade-bottom absolute inset-x-0 bottom-0 h-2/3" />
      <div className="glow absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 opacity-40 mix-blend-screen" />

      {/* floating beans */}
      <motion.img src={beans} alt="" aria-hidden style={{ y: b1, x: mx }} className="animate-float absolute right-[6%] top-[18%] w-28 md:w-44" />
      <motion.img src={beans} alt="" aria-hidden style={{ y: b2, x: mxNeg, rotate: 120 }} className="absolute bottom-[14%] left-[4%] w-20 opacity-80 blur-[1px] md:w-32" />
      <motion.img src={beans} alt="" aria-hidden style={{ y: b3, x: my, rotate: -40 }} className="animate-float absolute right-[28%] bottom-[8%] w-14 opacity-60 blur-[3px] md:w-20" />

      <Steam className="absolute left-1/2 top-[30%] h-52 w-40 -translate-x-1/2 opacity-60" />

      <motion.div style={{ y: titleY, opacity: fade }} className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 md:px-10 md:pb-20">
        <motion.p className="eyebrow mb-6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 1 }}>
          Specialty Coffee Atelier — Est. 2014
        </motion.p>
        <h1 className="display-xl">
          <span className="block overflow-hidden">
            <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.3, ease: silk, delay: 0.9 }}>
              Brewed
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span className="block pl-[8vw] italic-serif text-gradient-copper" style={{ x: myNeg }} initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.3, ease: silk, delay: 1.05 }}>
              after dark.
            </motion.span>
          </span>
        </h1>

        <motion.div
          className="mt-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1, ease: silk }}
        >
          <p className="max-w-sm text-base text-foreground/75 md:text-lg">
            Small-batch roasts from twelve family farms, crafted by night and poured with intention.
          </p>
          <div className="flex flex-wrap gap-4">
            <Magnetic>
              <Button asChild variant="copper" size="xl">
                <Link to="/collections" data-cursor="Shop">
                  Shop Coffee <ArrowRight />
                </Link>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild variant="line" size="xl">
                <Link to="/story">Our Story</Link>
              </Button>
            </Magnetic>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex" style={{ opacity: fade }}>
        <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Scroll</span>
        <span className="relative h-14 w-px overflow-hidden bg-foreground/15">
          <motion.span className="absolute left-0 top-0 h-1/2 w-full bg-primary" animate={{ y: ["-100%", "200%"] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
        </span>
      </motion.div>
    </section>
  );
}

/* ----------------------------- MANIFESTO ----------------------------- */

function Manifesto() {
  return (
    <section className="relative mx-auto grid max-w-7xl gap-16 px-6 py-32 md:grid-cols-12 md:px-10 md:py-48">
      <div className="md:col-span-7">
        <p className="eyebrow mb-10">01 — The Ritual</p>
        <ScrollWords
          className="font-display text-3xl font-light leading-[1.2] md:text-5xl"
          text="We believe the best coffee is made slowly. Picked by hand at altitude, rested for forty-eight hours, roasted in the quiet of night — so every cup you pour tastes like the place it came from."
        />
        <FadeUp delay={0.2} className="mt-12">
          <Link to="/story" className="link-underline inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-primary">
            Read our story <ArrowUpRight className="h-4 w-4" />
          </Link>
        </FadeUp>
      </div>
      <div className="relative md:col-span-5">
        <ParallaxImage src={latte} alt="Rosetta latte art in a speckled ceramic cup" className="aspect-[4/5] w-full rounded-3xl shadow-elegant" width={1024} height={1024} />
        <RotatingBadge className="absolute -bottom-10 -left-10 md:-left-16" />
      </div>
    </section>
  );
}

function RotatingBadge({ className }: { className?: string }) {
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 3000], [0, 360]);
  return (
    <motion.div style={{ rotate }} className={className}>
      <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-copper md:h-44 md:w-44">
        <svg viewBox="0 0 200 200" className="animate-spin-slow absolute inset-0 h-full w-full">
          <defs>
            <path id="circle" d="M100,100 m-75,0 a75,75 0 1,1 150,0 a75,75 0 1,1 -150,0" />
          </defs>
          <text className="fill-current text-[15px] font-semibold uppercase tracking-[0.3em]">
            <textPath href="#circle">Fresh roasted daily • Nocturne • </textPath>
          </text>
        </svg>
        <span className="font-display text-4xl italic">N</span>
      </div>
    </motion.div>
  );
}

/* ----------------------------- SHOWCASE ----------------------------- */

function Showcase() {
  const [active, setActive] = useState(0);
  const p = products[active]!;

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % products.length), 7000);
    return () => clearInterval(id);
  }, [active]);

  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <AnimatePresence>
        <motion.div
          key={p.slug}
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at 70% 50%, ${p.tone}, transparent 70%)` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-6">02 — Featured Roasts</p>
            <SplitText text="Taste the night shift." className="display-lg" />
          </div>
          <Link to="/collections" className="link-underline inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-primary">
            View all coffee <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-12">
          <ul className="space-y-1 lg:col-span-4">
            {products.map((prod, i) => (
              <li key={prod.slug}>
                <button
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className="group relative flex w-full items-baseline gap-5 border-b border-border py-5 text-left"
                >
                  <span className="text-xs tabular-nums text-muted-foreground">0{i + 1}</span>
                  <span className={`font-display text-2xl font-light transition-all duration-500 md:text-3xl ${i === active ? "translate-x-3 italic text-primary" : "text-foreground/60 group-hover:text-foreground"}`}>
                    {prod.name}
                  </span>
                  {i === active && (
                    <motion.span layoutId="showcase-bar" className="absolute bottom-[-1px] left-0 h-px w-full bg-primary" />
                  )}
                  {i === active && (
                    <motion.span
                      key={`progress-${active}`}
                      className="absolute bottom-[-1px] left-0 h-[2px] bg-accent"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 7, ease: "linear" }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="relative lg:col-span-4">
            <TiltCard className="mx-auto aspect-[4/5] w-full max-w-sm">
              <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-elegant">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={p.slug}
                    src={p.image}
                    alt={`${p.name} coffee bag`}
                    width={1024}
                    height={1280}
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.3 }}
                    animate={{ clipPath: "inset(0% 0 0 0)", scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                  />
                </AnimatePresence>
              </div>
            </TiltCard>
          </div>

          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={p.slug}
                initial="hidden"
                animate="show"
                exit="exit"
                variants={{ show: { transition: { staggerChildren: 0.08 } } }}
              >
                {[
                  <p key="o" className="eyebrow">{p.origin} · {p.category}</p>,
                  <h3 key="n" className="mt-4 font-display text-5xl font-light italic">{p.name}</h3>,
                  <p key="b" className="mt-5 text-foreground/75">{p.blurb}</p>,
                  <div key="t" className="mt-6 flex flex-wrap gap-2">
                    {p.notes.map((n) => (
                      <span key={n} className="rounded-full border border-border px-4 py-1.5 text-xs uppercase tracking-wider text-foreground/80">{n}</span>
                    ))}
                  </div>,
                  <div key="m" className="mt-6 grid grid-cols-2 gap-4 border-y border-border py-5 text-sm">
                    <div><p className="text-muted-foreground">Altitude</p><p className="mt-1">{p.altitude}</p></div>
                    <div><p className="text-muted-foreground">Process</p><p className="mt-1">{p.process}</p></div>
                  </div>,
                  <RoastMeter key="r" level={p.roast} className="mt-5" />,
                  <div key="c" className="mt-8 flex items-center gap-6">
                    <span className="font-display text-4xl font-light">${p.price}</span>
                    <Magnetic>
                      <Button
                        variant="copper"
                        size="xl"
                        onClick={() => {
                          bag.add();
                          toast.success(`${p.name} added to your bag`, { description: "250g · Whole bean" });
                        }}
                      >
                        <Plus /> Add to bag
                      </Button>
                    </Magnetic>
                  </div>,
                ].map((el, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: silk } },
                      exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
                    }}
                  >
                    {el}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ JOURNEY ------------------------------ */

const steps = [
  { n: "I", title: "Harvest", text: "Ripe cherries hand-picked at 2,000 metres, one pass at a time.", img: farm },
  { n: "II", title: "Roast", text: "Small drums, low flame, long nights. Every batch profiled by hand.", img: roaster },
  { n: "III", title: "Extract", text: "Eighteen grams, thirty seconds, a ribbon of liquid caramel.", img: hero },
  { n: "IV", title: "Pour", text: "Silk-textured milk and a steady wrist — the last act of the ritual.", img: latte },
];

function Journey() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={ref} className="relative h-[400vh] bg-card">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="mx-auto flex w-full max-w-7xl items-end justify-between px-6 pt-28 md:px-10">
          <div>
            <p className="eyebrow mb-4">03 — From Cherry to Cup</p>
            <h2 className="display-md">The long way <span className="italic-serif text-primary">round.</span></h2>
          </div>
          <div className="hidden w-60 md:block">
            <div className="h-px w-full bg-foreground/15">
              <motion.div className="h-px origin-left bg-primary" style={{ scaleX: progress }} />
            </div>
          </div>
        </div>
        <motion.div style={{ x }} className="flex h-full w-[400%] items-center">
          {steps.map((s) => (
            <div key={s.title} className="flex h-full w-1/4 items-center px-6 md:px-10">
              <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-elegant">
                  <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover" />
                  <div className="vignette absolute inset-0" />
                </div>
                <div>
                  <span className="font-display text-8xl font-light italic outline-text md:text-[10rem]">{s.n}</span>
                  <h3 className="display-md -mt-6">{s.title}</h3>
                  <p className="mt-6 max-w-sm text-lg text-foreground/70">{s.text}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------- STATS ------------------------------- */

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2.2, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setVal(v) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className="tabular-nums">
      {to % 1 ? val.toFixed(1) : Math.round(val)}
      {suffix}
    </span>
  );
}

function Stats() {
  const stats = [
    { to: 12, suffix: "", label: "Partner farms" },
    { to: 48, suffix: "h", label: "Rest before roast" },
    { to: 1.2, suffix: "M", label: "Cups poured / year" },
    { to: 4, suffix: "", label: "Cities after dark" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-28 md:px-10">
      <div className="grid grid-cols-2 gap-y-14 md:grid-cols-4">
        {stats.map((s, i) => (
          <FadeUp key={s.label} delay={i * 0.1} className="border-l border-border pl-6">
            <p className="font-display text-6xl font-light text-primary md:text-7xl">
              <Counter to={s.to} suffix={s.suffix} />
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">{s.label}</p>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------- MENU TEASER ---------------------------- */

const teaser = [
  { name: "Nocturne Latte", note: "Burnt honey · sea salt", price: "5.9", img: latte },
  { name: "Espresso Tonic", note: "Yuzu · Ethiopian shot", price: "6.2", img: iced },
  { name: "Siphon Theatre", note: "Brewed at your table", price: "9.5", img: hero },
  { name: "Cardamom Bun", note: "Baked at dawn", price: "4.2", img: roaster },
];

function MenuTeaser() {
  const [hover, setHover] = useState<number | null>(null);
  const x = useSpring(0, { stiffness: 150, damping: 20 });
  const y = useSpring(0, { stiffness: 150, damping: 20 });
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section className="mx-auto max-w-7xl px-6 py-28 md:px-10">
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow mb-6">04 — On the Bar</p>
          <SplitText text="Tonight's pours." className="display-lg" />
        </div>
        <Link to="/menu" className="link-underline inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-primary">
          Full menu <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div
        ref={ref}
        className="relative"
        onPointerMove={(e) => {
          const r = ref.current?.getBoundingClientRect();
          if (!r) return;
          x.set(e.clientX - r.left);
          y.set(e.clientY - r.top);
        }}
        onPointerLeave={() => setHover(null)}
      >
        {teaser.map((t, i) => (
          <Link
            to="/menu"
            key={t.name}
            data-cursor="View"
            onMouseEnter={() => setHover(i)}
            className="group flex items-center justify-between gap-6 border-b border-border py-8 transition-colors"
          >
            <div className="flex items-baseline gap-6">
              <span className="text-xs tabular-nums text-muted-foreground">0{i + 1}</span>
              <span className="font-display text-3xl font-light transition-all duration-500 group-hover:translate-x-4 group-hover:italic group-hover:text-primary md:text-6xl">
                {t.name}
              </span>
            </div>
            <div className="flex items-center gap-8">
              <span className="hidden text-sm text-muted-foreground md:inline">{t.note}</span>
              <span className="font-display text-2xl">${t.price}</span>
            </div>
          </Link>
        ))}

        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-10 hidden h-64 w-52 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl shadow-elegant md:block"
          style={{ x, y }}
          animate={{ opacity: hover === null ? 0 : 1, scale: hover === null ? 0.6 : 1 }}
          transition={{ duration: 0.4 }}
        >
          {teaser.map((t, i) => (
            <motion.img
              key={t.name}
              src={t.img}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              animate={{ opacity: hover === i ? 1 : 0, scale: hover === i ? 1 : 1.2 }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------- STORES TEASER --------------------------- */

function StoresTeaser() {
  return (
    <section className="relative px-4 pb-28 md:px-6">
      <div className="relative overflow-hidden rounded-[2rem]">
        <ParallaxImage src={store} alt="Inside a Nocturne café at dusk" className="h-[85vh] min-h-[560px] w-full" speed={18} width={1600} height={1072} />
        <div className="vignette pointer-events-none absolute inset-0" />
        <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-14">
          <p className="eyebrow">05 — Visit</p>
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <div>
              <SplitText text="Four rooms," className="display-lg" />
              <SplitText text="one night sky." className="display-lg italic-serif text-gradient-copper" delay={0.15} />
            </div>
            <div className="glass w-full max-w-sm rounded-3xl border border-border p-6">
              <ul className="divide-y divide-border">
                {stores.map((s) => (
                  <li key={s.city} className="flex items-center justify-between py-3">
                    <span className="font-display text-xl">{s.city}</span>
                    <span className="text-xs text-muted-foreground">{s.hours[0]?.time}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="copper" size="xl" className="mt-5 w-full">
                <Link to="/stores">Find a store <ArrowRight /></Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
