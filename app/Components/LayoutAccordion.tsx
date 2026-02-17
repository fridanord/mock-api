'use client';

import React, { useState } from "react";

type Tab = "START" | "PROJECTS" | "ENDPOINTS" | "SCENARIO";

const tabs: Tab[] = ["START", "PROJECTS", "ENDPOINTS", "SCENARIO"];

type LayoutAccordionProps = {
    children?: React.ReactNode;
};

// Placeholder content for each tab
// Just import your actual components here
const tabContent = (children?: React.ReactNode): Record<Tab, React.ReactNode> => ({
    START: children ?? <div className="p-8 text-white">Start Content</div>,
    PROJECTS: <div className="p-8 text-white">Projects Content</div>,
    ENDPOINTS: <div className="p-8 text-white">Endpoints Content</div>,
    SCENARIO: <div className="p-8 text-white">Scenario Content</div>,
});

export default function LayoutAccordion({ children }: LayoutAccordionProps) {
    const [openTab, setOpenTab] = useState<Tab>("START");
    const content = tabContent(children);

    return (
        // Full viewport; change to h-full if PARENT controls HEIGHT
        <div className="flex h-screen w-full bg-[#222]">
            {tabs.map((tab) => {
                const isActive = tab === openTab;

                return (
                    <React.Fragment key={tab}>
                        {/* Tab strip */}
                        <button
                            onClick={() => setOpenTab(tab)}
                            className={` relative h-full w-16 flex flex-col items-center justify-start pt-4 border-r border-gray-400 transition-colors
                ${isActive
                                    ? "bg-white text-black"
                                    : "bg-gradient-to-b from-gray-200 to-gray-400 text-black"
                                }`}
                        >
                            <span className="[writing-mode:vertical-rl] rotate-180 tracking-[0.25em] font-medium whitespace-nowrap py-4">
                                {tab}
                            </span>
                        </button>

                        {/* Tab content */}
                        {isActive && (
                            <div className="flex-1 h-full">
                                <div className="w-full h-full bg-[#111] border-l border-neutral-500">
                                    {content[tab]}
                                </div>
                            </div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}