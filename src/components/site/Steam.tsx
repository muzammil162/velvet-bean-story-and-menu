import { cn } from "@/lib/utils";

export function Steam({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 160" className={cn("pointer-events-none", className)} aria-hidden>
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${35 + i * 25} 150 C ${15 + i * 25} 115, ${60 + i * 25} 95, ${35 + i * 25} 60 S ${50 + i * 25} 20, ${35 + i * 25} 5`}
          className="animate-steam fill-none stroke-foreground/50"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ animationDelay: `${i * 1.2}s`, filter: "blur(3px)" }}
        />
      ))}
    </svg>
  );
}
