"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import LogRegComponent from "../Components/LogRegComponent";

type Mode = "login" | "register";

// [mode] i mappstrukter är ett dynamiskt segment 
// Mode sätts baserat på den valda segmenten i URL:en, om segmentet är "register" så är mode "register", annars är det "login". Detta används för att visa rätt innehåll i LogRegComponent beroende på vilken flik användaren är på.
export default function AuthShell() {
    const segment = useSelectedLayoutSegment();
    const mode: Mode = segment === "register" ? "register" : "login";

    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-8 pb-8">
            <LogRegComponent mode={mode} />
            {/* Placeholder welcome message; LÄGG TILL CONTENT EFTER LOGIN/REGCOMP EFTER HÄR */}
            <section className="w-full max-w-md mt-8 text-center">
                <h1 className="text-4xl font-bold text-white mb-4">Välkommen till API Playground</h1>
            </section>
            <section className="w-full max-w-md h-[800px] bg-amber-400 mt-4 text-center"> </section>
        </section>
    );
}