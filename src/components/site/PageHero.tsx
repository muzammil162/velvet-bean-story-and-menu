import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SplitText } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  italic,
  image,
  intro,
}: {
  eyebrow: string;
  title: string;
  italic: string;
  image: string;
  intro: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative flex h-[88vh] min-h-[600px] items-end overflow-hidden">
      <motion.img
        src={image}
        alt=""
        style={{ y, scale }}
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className="vignette absolute inset-0" />
      <div className="fade-bottom absolute inset-x-0 bottom-0 h-1/2" />
      <motion.div style={{ y: textY, opacity }} className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 md:px-10">
        <motion.p className="eyebrow mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          {eyebrow}
        </motion.p>
        <SplitText as="h1" text={title} className="display-lg" delay={0.3} />
        <SplitText as="h1" text={italic} className="display-lg italic-serif text-gradient-copper" delay={0.5} />
        <motion.p
          className="mt-8 max-w-xl text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          {intro}
        </motion.p>
      </motion.div>
    </section>
  );
}
