"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import LogRegComponent from "../components/LogRegComponent";

export default function AuthShell() {
    const segment = useSelectedLayoutSegment(); // "login" | "register" | null
    const mode = segment === "register" ? "register" : "login";

    return <LogRegComponent mode={mode} onSubmit={ } />;
}