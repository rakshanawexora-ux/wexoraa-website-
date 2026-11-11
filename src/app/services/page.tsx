import { pageMetadata } from "@/lib/seo";
import { PageShell } from "@/components/page-shell";
import ServiceExplorer from "@/components/service-explorer";
export const metadata = pageMetadata(
  "Design, engineering and growth services — Wexoraa",
  "Explore Wexoraa services from branding and websites to CRM, ERP, AI automation, SEO and creative production.",
  "/services",
);
export default function Page() {
  return (
    <PageShell
      eyebrow="OUR SERVICES"
      title="What would you like help with?"
      intro="Need a website, an app, business software or help with marketing? Find the right service below, or tell us what you are trying to improve."
    >
      <ServiceExplorer />
    </PageShell>
  );
}
