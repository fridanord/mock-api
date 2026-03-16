"use client";

import Navbar from "../Components/Navbar";
import LayoutAccordion from "../Components/LayoutAccordion";

export default function StartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <LayoutAccordion>{children}</LayoutAccordion>
      </div>
    </main>
  );
}