"use client";

import LogRegComponent from "../Components/LogRegComponent";

type Mode = "login" | "register";

export default function AuthShell({ mode }: { mode: Mode }) {
    return (
        <main className="min-h-screen flex items-center justify-center px-4">
            <LogRegComponent mode={mode} />
        </main>
    );
}