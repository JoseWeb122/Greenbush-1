import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import StoryListing from "@/components/StoryListing";
import { STORIES, eventStatus } from "@/data/content";

export const metadata: Metadata = { title: "Community", description: "Real stories, shared values, and the people who make Greenbush Twins a community that cares." };

export default function Page() {
  const list = STORIES.filter((s) => s.kind !== "Event").sort((a, b) => (eventStatus(a) === "past" ? 1 : 0) - (eventStatus(b) === "past" ? 1 : 0));
  return (
    <>
      <PageHero eyebrow="Community" title="Building a Community That Cares">Real stories, shared values, and the people who make Greenbush Twins a community that cares.</PageHero>
      <StoryListing stories={list} filters={["Community", "Brand", "Artist"]} />
    </>
  );
}

export const revalidate = 3600;
