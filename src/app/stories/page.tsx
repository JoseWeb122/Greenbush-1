import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import StoryListing from "@/components/StoryListing";
import { STORIES, eventStatus } from "@/data/content";

export const metadata: Metadata = { title: "Stories & Events", description: "Announcements, appearances, and stories from the Greenbush Twins community. Past events are clearly marked." };

export default function Page() {
  const list = STORIES.filter((s) => s.kind === "Event" || s.kind === "Brand" || s.kind === "Community").sort((a, b) => (eventStatus(a) === "past" ? 1 : 0) - (eventStatus(b) === "past" ? 1 : 0));
  return (
    <>
      <PageHero eyebrow="Stories, events & updates" title="Stories & Events">Announcements, appearances, and stories from the Greenbush Twins community. Past events are clearly marked.</PageHero>
      <StoryListing stories={list} filters={["Event", "Brand", "Community"]} />
    </>
  );
}

export const revalidate = 3600;
