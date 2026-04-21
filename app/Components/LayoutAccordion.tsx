"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams, useSelectedLayoutSegment } from "next/navigation";

type Tab = {
  label: "START" | "PROJECTS" | "ENDPOINTS" | "SCENARIO";
};

const tabs: Tab[] = [
  { label: "START" },
  { label: "PROJECTS" },
  { label: "ENDPOINTS" },
  { label: "SCENARIO" },
];

type LayoutAccordionProps = {
  children: React.ReactNode;
};

export default function LayoutAccordion({ children }: LayoutAccordionProps) {
  const segment = useSelectedLayoutSegment();
  const searchParams = useSearchParams();

  const projectId = searchParams.get("projectId") ?? "";
  const endpointId = searchParams.get("endpointId") ?? "";

  const activeLabel =
    segment === "projects"
      ? "PROJECTS"
      : segment === "endpoints"
      ? "ENDPOINTS"
      : segment === "scenario"
      ? "SCENARIO"
      : "START";

  const getTabHref = (label: Tab["label"]) => {
    if (label === "START") return "/start";
    if (label === "PROJECTS") return "/start/projects";

    if (label === "ENDPOINTS") {
      return projectId
        ? `/start/endpoints?projectId=${projectId}`
        : "/start/endpoints";
    }

    if (label === "SCENARIO") {
      if (projectId && endpointId) {
        return `/start/scenario?projectId=${projectId}&endpointId=${endpointId}`;
      }

      if (projectId) {
        return `/start/scenario?projectId=${projectId}`;
      }

      return "/start/scenario";
    }

    return "/start";
  };

  return (
    <div className="flex min-h-screen w-full bg-[#222]">
      {tabs.map((tab) => {
        const isActive = tab.label === activeLabel;

        return (
          <React.Fragment key={tab.label}>
            <Link
              href={getTabHref(tab.label)}
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
              <div className="flex-1">
                <div className="min-h-screen w-full border-l border-grey-91 bg-background">
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