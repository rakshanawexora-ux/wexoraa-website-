import Home from "@/components/home";
import { emailConfigured } from "@/lib/enquiry";
export default function Page() {
  return <Home emailReady={emailConfigured()} />;
}
