import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StoryDetail from "@/components/StoryDetail";
import { STORIES } from "@/data/content";

const list = STORIES.filter((s) => s.kind !== "Event");
export function generateStaticParams() { return list.map((s) => ({ slug: s.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  const item = list.find((x) => x.slug === slug);
  return item ? { title: item.title, description: item.excerpt } : { title: "Not found" };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = list.find((x) => x.slug === slug);
  if (!s) notFound();
  return <StoryDetail s={s} section="Community" sectionHref="/community" />;
}
