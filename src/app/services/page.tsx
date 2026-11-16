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
      title="Design, websites, software and marketing. One team."
      intro="A new website? Fewer missed enquiries? More customers finding you? Choose the help you need below. We’ll connect the design, technology and marketing around your business."
    >
      <ServiceExplorer />
    </PageShell>
  );
}
