"use client";

import Navbar from "../components/Navbar";
import LayoutAccordion from "../components/LayoutAccordion";

export default function StartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <div className="flex-1">
        <LayoutAccordion>{children}</LayoutAccordion>
      </div>
    </main>
  );
}
