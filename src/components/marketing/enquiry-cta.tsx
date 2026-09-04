import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site-config";
import { unsplash, ctaImage } from "@/lib/images";
import { useEnquiryModal } from "@/components/providers/enquiry-modal-context";
import { useSiteSettings } from "@/components/providers/site-settings-context";

export function EnquiryCta() {
  const { open: openEnquiry } = useEnquiryModal();
  const { whatsapp } = useSiteSettings();

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${unsplash(ctaImage, 1800)})` }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{ background: "rgba(30, 20, 52, 0.78)" }}
        aria-hidden
      />
      <Container className="relative flex flex-col items-center gap-5 py-10 text-center text-white sm:py-14">
        <p className="eyebrow text-white/70">Ready when you are</p>
        <h2 className="max-w-2xl text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl">
          Ready to plan your next journey?
        </h2>
        <p className="max-w-xl text-xs text-white/80 sm:text-sm sm:leading-6">
          Tell us where you want to go and how you like to travel — we&apos;ll
          craft the rest.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => openEnquiry()}
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-deep shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            Make an enquiry
          </button>
          <LinkButton
            href={whatsappLink(undefined, whatsapp)}
            external
            variant="ghost"
            size="lg"
          >
            Chat on WhatsApp
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
