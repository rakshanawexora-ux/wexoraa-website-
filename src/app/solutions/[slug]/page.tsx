import { permanentRedirect, notFound } from "next/navigation";
export function generateStaticParams() {
  return ["build", "operate", "grow"].map((slug) => ({ slug }));
}
export default async function RemovedSolution({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!["build", "operate", "grow"].includes(slug)) notFound();
  permanentRedirect(`/services#${slug}`);
}
