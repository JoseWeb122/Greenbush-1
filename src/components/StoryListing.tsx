"use client";
import { useState } from "react";
import type { Story } from "@/data/content";
import StoryCard from "./StoryCard";

export default function StoryListing({ stories, filters }: { stories: Story[]; filters?: string[] }) {
  const [f, setF] = useState("All");
  const list = f === "All" ? stories : stories.filter((s) => s.kind === f);
  const [first, ...rest] = list;
  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-24 md:px-10">
      {filters && (
        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter stories">
          {["All", ...filters].map((x) => (
            <button key={x} aria-pressed={f === x} onClick={() => setF(x)} className={`px-4 py-2 text-sm ${f === x ? "bg-forest text-white" : "border border-charcoal/15 hover:border-forest"}`}>{x}</button>
          ))}
        </div>
      )}
      {first && <div className="mb-14 max-w-4xl"><StoryCard s={first} large /></div>}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">{rest.map((s) => <StoryCard key={s.slug} s={s} />)}</div>
    </div>
  );
}
