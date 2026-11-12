import { cn } from "@/lib/utils";

export function RoastMeter({ level, className }: { level: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Roast</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={cn(
              "h-1.5 w-5 rounded-full transition-colors duration-500",
              n <= level ? "bg-primary" : "bg-foreground/15",
            )}
          />
        ))}
      </div>
    </div>
  );
}
