import { Outlet } from "react-router-dom";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { FloatingContactActions } from "@/components/layout/floating-contact-actions";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { EnquiryModalProvider } from "@/components/providers/enquiry-modal-provider";
import { SiteSettingsProvider } from "@/components/providers/site-settings-context";

export function PublicLayout() {
  return (
    <EnquiryModalProvider>
      <SiteSettingsProvider>
        <div className="flex min-h-full flex-col">
          <ScrollProgress />
          <SiteHeader />
          <main className="flex-1">
            <Outlet />
          </main>
          <SiteFooter />
          <MobileActionBar />
          <FloatingContactActions />
        </div>
      </SiteSettingsProvider>
    </EnquiryModalProvider>
  );
}
