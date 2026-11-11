import { PageShell } from "@/components/page-shell";
import ServiceExplorer from "@/components/service-explorer";
export const metadata = {
  title: "Design, engineering and growth services — Wexoraa",
  description:
    "Explore Wexoraa services from branding and websites to CRM, ERP, AI automation, SEO and creative production.",
  alternates: { canonical: "/services" },
};
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
