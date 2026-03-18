"use client";

import LayoutAccordion from "../Components/LayoutAccordion";
import Navbar from "../Components/Navbar";
import AuthShell from "../(auth)/AuthShell";
import EditEndpointBase from "../Components/EditEndpointBase";
import EndpointListContainer, {
  FakeEndpoint,
} from "../Components/EndpointListContainer";
import { useSelectedLayoutSegment } from "next/navigation";

const testEndpoints: FakeEndpoint[] = [
  { id: "6", method: "GET", path: "/TEST" },
];

export default function StartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();
  const isAuthMode = segment === "login" || segment === "register";

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <LayoutAccordion
          start={
            <>
              {isAuthMode ? <AuthShell /> : children}
            </>
          }
          projects={<div className="p-8 text-white">Projects UI goes here</div>}
          endpoints={
            <section>
              <div className="p-8 text-white">Endpoints UI goes here</div>
              <EndpointListContainer endpoints={testEndpoints} />
              <EditEndpointBase />
            </section>
          }
          scenario={<div className="p-8 text-white">Scenario UI goes here</div>}
        />
      </div>
    </main>
  );
}