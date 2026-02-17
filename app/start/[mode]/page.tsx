import { notFound } from "next/navigation";
import AuthShell from "../../(auth)/AuthShell";

type Mode = "login" | "register";

export default async function StartModePage({
    params,
}: {
    params: Promise<{ mode: string }>;
}) {
    const { mode } = await params;

    if (mode !== "login" && mode !== "register") {
        notFound();
    }

    return <AuthShell mode={mode as Mode} />;
}