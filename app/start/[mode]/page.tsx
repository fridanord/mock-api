import { notFound } from "next/navigation";

export default async function StartModePage({
    params,
}: {
    params: Promise<{ mode: string }>;
}) {
    const { mode } = await params;

    if (mode !== "login" && mode !== "register") {
        notFound();
    }

    return null;
}