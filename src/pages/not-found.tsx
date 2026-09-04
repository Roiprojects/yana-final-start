import { Link } from "react-router-dom";
import { Container } from "@/components/ui/container";

export function NotFoundPage() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-heading text-7xl font-extrabold tracking-[-0.05em] text-primary">
        404
      </p>
      <h1 className="mt-4 text-2xl font-extrabold">Page not found</h1>
      <p className="mt-2 max-w-md text-sm leading-6 text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex rounded-full bg-cta px-6 py-3 font-semibold text-white shadow-[0_18px_30px_-18px_rgba(11,102,228,0.8)] transition-all duration-300 hover:-translate-y-0.5"
      >
        Back to home
      </Link>
    </Container>
  );
}
