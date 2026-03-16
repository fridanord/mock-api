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
              className={`relative w-16 flex flex-col items-center justify-start pt-4 border-r border-gray-400 transition-colors ${
                isActive
                  ? "bg-white text-black"
                  : "bg-gradient-to-b from-gray-200 to-gray-400 text-black"
              }`}
            >
              <span className="[writing-mode:vertical-rl] rotate-180 tracking-[0.25em] font-medium whitespace-nowrap py-4">
                {tab.label}
              </span>
            </Link>

            {isActive && (
              <div className="flex-1 h-full">
                <div className="w-full h-full bg-[#111] border-l border-neutral-500">
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