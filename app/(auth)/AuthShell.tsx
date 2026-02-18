"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import LogRegComponent from "../Components/LogRegComponent";

type Mode = "login" | "register";

export default function AuthShell() {
    const segment = useSelectedLayoutSegment();
    const mode: Mode = segment === "register" ? "register" : "login";

    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4">
            <LogRegComponent mode={mode} />
            {/* Placeholder welcome message; LÄGG TILL CONTENT EFTER LOGIN/REGCOMP EFTER HÄR */}
            <section className="w-full max-w-md mt-8 text-center">
                <h1 className="text-4xl font-bold text-white mb-4">Välkommen till API Playground</h1>
            </section>
        </main>
    );
}