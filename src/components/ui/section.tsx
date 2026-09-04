import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export function Section({
  tone = "white",
  className,
  children,
}: {
  tone?: "white" | "soft";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn(tone === "soft" ? "bg-bg-soft" : "bg-bg-main")}>
      <Container className={cn("py-4 sm:py-6 md:py-7", className)}>
        {children}
      </Container>
    </section>
  );
}
