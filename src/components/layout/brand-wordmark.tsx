import { cn } from "@/lib/utils";

export function BrandWordmark({
  className,
  accentClassName,
  textClassName,
}: {
  className?: string;
  accentClassName?: string;
  textClassName?: string;
}) {
  return (
    <span className={cn("flex min-w-0 flex-col", className)}>
      <span
        className={cn(
          "font-heading text-[1.5rem] font-black uppercase leading-[0.84] tracking-[-0.05em]",
          accentClassName,
        )}
      >
        Yana
      </span>
      <span
        className={cn(
          "font-heading text-[1.9rem] font-black leading-[0.84] tracking-[-0.06em]",
          textClassName,
        )}
      >
        Travels
      </span>
    </span>
  );
}
