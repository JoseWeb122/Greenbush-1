import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import StoryListing from "@/components/StoryListing";
import { STORIES, eventStatus } from "@/data/content";

export const metadata: Metadata = { title: "Artists & Creators", description: "Meet the makers, artists, and dreamers who bring mindful creation and meaningful connection to the Greenbush Twins collection." };

export default function Page() {
  const list = STORIES.filter((s) => s.kind === "Artist").sort((a, b) => (eventStatus(a) === "past" ? 1 : 0) - (eventStatus(b) === "past" ? 1 : 0));
  return (
    <>
      <PageHero eyebrow="Our artists" title="Collaborate With Our Artisans">Meet the makers, artists, and dreamers who bring mindful creation and meaningful connection to the Greenbush Twins collection.</PageHero>
      <StoryListing stories={list} />
    </>
  );
}
