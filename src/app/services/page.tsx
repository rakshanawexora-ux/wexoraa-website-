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
      eyebrow="OUR CAPABILITIES"
      title="The right skills. One shared direction."
      intro="Choose a focused service or combine disciplines around a bigger business challenge."
    >
      <ServiceExplorer />
    </PageShell>
  );
}
