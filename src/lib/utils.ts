/**
 * Lightweight className combiner. Kept dependency-free for now; if variant-heavy
 * components arrive, swap for `clsx` + `tailwind-merge`.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
