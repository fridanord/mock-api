import { notFound } from "next/navigation";

// StartModePage är en sida som hanterar både login och register baserat på URL:en, den tar emot params som innehåller mode (antingen "login" eller "register") och om mode inte är giltigt så visas en 404-sida. Den returnerar null eftersom själva innehållet renderas i AuthShell-komponenten som ligger i layouten.
export default async function StartModePage({
    params,
}: {
    params: Promise<{ mode: string }>;
}) {
    const { mode } = await params;

    if (mode !== "login" && mode !== "register") {
        notFound(); // Om mode inte är "login" eller "register", visa 404-sidan
    }

    return null;
}