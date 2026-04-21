"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2, ArrowLeft } from "lucide-react";

export default function NewProjectPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [jsonContent, setJsonContent] = useState('{\n  "id": 1240,\n  "full_name": "Jane Doe"\n}');
    const [isSaving, setIsSaving] = useState(false);
    const [isValidJson, setIsValidJson] = useState(true);

    useEffect(() => {
        try {
            JSON.parse(jsonContent);
            setIsValidJson(true);
        } catch {
            setIsValidJson(false);
        }
    }, [jsonContent]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValidJson) return;

        const userId = (session?.user as any)?.id;

        if (!userId) {
            console.error("Missing user id in session.");
            return;
        }

        setIsSaving(true);

        try {
            const res = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    description,
                    ownerId: userId,
                    initialSchema: JSON.parse(jsonContent),
                }),
            });

            if (res.ok) {
                router.push("/start/projects");
                router.refresh();
            }
        } catch (error) {
            console.error("Error saving project:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <section className="h-full w-full bg-grey-96 p-8 font-figtree">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <button
                            onClick={() => router.back()}
                            className="btn-ghost mb-2 flex items-center gap-2"
                        >
                            <ArrowLeft size={16} /> Tillbaka
                        </button>
                        <h1 className="text-azure-11 text-3xl font-bold">Skapa schema</h1>
                        <p className="mt-1 text-sm font-medium italic text-azure-34">
                            Projekt: {name || "Tex: Webshop API"}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => router.back()}
                            className="btn-secondary px-8 py-2"
                        >
                            Avbryt
                        </button>

                        <button
                            onClick={handleSubmit}
                            className="btn-primary flex items-center gap-2 px-10 py-2"
                            disabled={
                                isSaving ||
                                !name ||
                                !isValidJson ||
                                status !== "authenticated" ||
                                !(session?.user as any)?.id
                            }
                        >
                            {isSaving ? (
                                <Loader2 className="animate-spin" size={18} />
                            ) : (
                                "Spara"
                            )}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <div className="card-base space-y-8 p-10">
                        <h2 className="text-azure-11 text-lg font-bold">Basic Settings</h2>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-bold uppercase tracking-widest italic text-azure-65">
                                Schema Name
                            </label>
                            <input
                                className="input-base w-full bg-white p-3"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="User Profile"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-bold uppercase tracking-widest italic text-azure-65">
                                Endpoint Path
                            </label>
                            <input
                                className="input-base w-full cursor-not-allowed bg-grey-91 p-3 text-azure-34 opacity-40"
                                value={`/mock/users/p_${(session?.user as any)?.id?.slice(-6) || "..."}`}
                                readOnly
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-bold uppercase tracking-widest italic text-azure-65">
                                Description
                            </label>
                            <textarea
                                className="input-base h-44 w-full resize-none bg-white p-4"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Primary user profile object..."
                            />
                        </div>

                        <div className="info-box">
                            <span className="font-bold text-blue-59">i</span>
                            <p className="text-[11px] leading-relaxed">
                                Tip: You can paste a JSON object directly into the definition panel on the right.
                                The builder will automatically validate the structure.
                            </p>
                        </div>
                    </div>

                    <div className="card-base flex h-650px flex-col overflow-hidden">
                        <div className="flex items-center justify-between border-b border-grey-91 bg-white px-8 py-4">
                            <h2 className="text-azure-11 text-lg font-bold">Schema Definition</h2>
                            <span
                                className={`status-badge ${
                                    isValidJson ? "status-valid" : "status-invalid"
                                } px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest`}
                            >
                                {isValidJson ? "Valid JSON" : "Invalid JSON"}
                            </span>
                        </div>

                        <textarea
                            className="grow resize-none bg-white p-10 font-mono text-sm leading-relaxed text-azure-17 outline-none"
                            value={jsonContent}
                            onChange={(e) => setJsonContent(e.target.value)}
                            spellCheck={false}
                            placeholder='{ "key": "value" }'
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}