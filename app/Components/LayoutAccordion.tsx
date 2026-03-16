"use client";

import React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

type Tab = {
  label: "START" | "PROJECTS" | "ENDPOINTS" | "SCENARIO";
  href: string;
};

const tabs: Tab[] = [
  { label: "START", href: "/start" },
  { label: "PROJECTS", href: "/start/projects" },
  { label: "ENDPOINTS", href: "/start/endpoints" },
  { label: "SCENARIO", href: "/start/scenario" },
];

type LayoutAccordionProps = {
  children: React.ReactNode;
};

export default function LayoutAccordion({ children }: LayoutAccordionProps) {
  const segment = useSelectedLayoutSegment();

  const activeLabel =
    segment === "projects"
      ? "PROJECTS"
      : segment === "endpoints"
      ? "ENDPOINTS"
      : segment === "scenario"
      ? "SCENARIO"
      : "START";

  return (
    <div className="flex min-h-screen w-full bg-[#222]">
      {tabs.map((tab) => {
        const isActive = tab.label === activeLabel;

        return (
          <React.Fragment key={tab.label}>
            <Link
              href={tab.href}
              className={`relative flex w-16 flex-col items-center justify-start border-r border-gray-400 pt-4 transition-colors ${
                isActive
                  ? "bg-white text-black"
                  : "bg-gradient-to-b from-gray-200 to-gray-400 text-black"
              }`}
            >
              <span className="[writing-mode:vertical-rl] rotate-180 whitespace-nowrap py-4 tracking-[0.25em] font-medium">
                {tab.label}
              </span>
            </Link>

            {isActive && (
              <div className="flex-1 h-full">
                <div className="h-full w-full border-l border-neutral-500 bg-[#111]">
                  {children}
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}