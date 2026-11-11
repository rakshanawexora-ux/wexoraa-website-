import type { Metadata } from "next";
import Assessment from "@/components/assessment";
export const metadata: Metadata = {
  title: "Find your business problem — Wexoraa Infotech",
  description:
    "Explore your business challenges and find a practical starting point for digital presence, lead management, operations and growth.",
};
export default function Page() {
  return <Assessment />;
}
