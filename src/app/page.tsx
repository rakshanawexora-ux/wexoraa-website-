import StructuredData from "@/components/structured-data";
import { homeFaqs } from "@/content/faqs";
import Home from "@/components/home";
import { emailConfigured } from "@/lib/enquiry";
export default function Page() {
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: homeFaqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
      <Home emailReady={emailConfigured()} />
    </>
  );
}
