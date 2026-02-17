"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import LogRegComponent from "../Components/LogRegComponent";

type Mode = "login" | "register";

export default function AuthShell() {
    const segment = useSelectedLayoutSegment();
    const mode: Mode = segment === "register" ? "register" : "login";

    return (
        <main className="min-h-screen flex items-center justify-center px-4">
            <LogRegComponent mode={mode} />
        </main>
    );
}