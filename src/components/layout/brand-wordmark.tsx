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
    <span
      className={cn(
        "flex min-w-0 flex-col whitespace-nowrap",
        className,
      )}
    >
      <span
        className={cn(
          "font-body text-[1.72rem] font-semibold leading-[0.88] tracking-[-0.05em]",
          accentClassName,
        )}
      >
        Yana
      </span>
      <span
        className={cn(
          "font-body text-[1.72rem] font-semibold leading-[0.88] tracking-[-0.05em]",
          textClassName,
        )}
      >
        Travels
      </span>
    </span>
  );
}
