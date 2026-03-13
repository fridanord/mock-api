"use client";

import LayoutAccordion from "../Components/LayoutAccordion";
import Navbar from "../Components/Navbar";
import AuthShell from "../(auth)/AuthShell";
import { useSelectedLayoutSegment } from "next/navigation";

export default function StartLayout({ children }: { children: React.ReactNode }) {
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
          endpoints={<div className="p-8 text-white">Endpoints UI goes here</div>}
          scenario={<div className="p-8 text-white">Scenario UI goes here</div>}
        />
      </div>
    </main>
  );
}
// FÖRSLAG:
// Förslag för hur struktur för projekts kanske borde se ut med layout för project, endpoints, och scenario,
// där varje flik i accordionen har sin egen layout som kan innehålla olika komponenter och logik,
// och där AuthShell bara är en del av start-fliken. Detta gör det mer flexibelt att utveckla varje del av
// applikationen utan att påverka de andra delarna, och gör det också lättare att hantera autentisering och
// användarflöden specifikt för start-fliken. (vet ej om jag har rätt)


// app/
//   start/
//     layout.tsx              (accordion shell)
//     [mode]/page.tsx         (/start/login or /start/register via dynamic route)
//     projects/
//       layout.tsx     !!! -> (projects-only layout) <- !!!
//       page.tsx              (/start/projects)
//     endpoints/
//       page.tsx              (/start/endpoints)
//     scenario/
//       page.tsx              (/start/scenario)


// REMINDER:

// With current solution, the Projects tab content is not driven by routing. It’s just whatever you pass into projects={...}.

// So if you want “Projects tab shows /start/projects page content”, you’d typically refactor so:

// the accordion tab buttons are <Link href="/start/projects">…</Link>, and
// the content area renders {children} (route content), and
// the “active tab” is derived from the current segment (like you do in AuthShell with useSelectedLayoutSegment).