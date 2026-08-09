import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center gap-6 py-28 text-center">
      <p className="font-heading text-6xl font-extrabold text-lavender">404</p>
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="max-w-md text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="flex gap-3">
        <LinkButton href="/">Back to home</LinkButton>
        <LinkButton href="/packages" variant="ghost">
          Browse packages
        </LinkButton>
      </div>
    </Container>
  );
}
