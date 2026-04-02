"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2, ArrowLeft } from "lucide-react";

export default function NewProjectPage() {
    const { data: session } = useSession();
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
        setIsSaving(true);

        try {
            const userId = (session?.user as any)?.id;
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

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <button
                          onClick={() => router.back()}
                          className="btn-ghost mb-2 flex items-center gap-2"
                        >
                            <ArrowLeft size={16} /> Tillbaka
                        </button>
                        <h1 className="text-azure-11 text-3xl font-bold">Redigera schema</h1>
                        <p className="text-azure-34 text-sm mt-1 italic font-medium">Projekt: {name || "Webshop API"}</p>
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
                          className="btn-primary px-10 py-2 flex items-center gap-2"
                          disabled={isSaving || !name || !isValidJson}
                        >
                            {isSaving ? <Loader2 className="animate-spin" size={18} /> : "Spara"}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    <div className="card-base p-10 space-y-8">
                        <h2 className="text-azure-11 text-lg font-bold">Basic Settings</h2>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-bold text-azure-65 uppercase tracking-widest italic">
                                Schema Name
                            </label>
                            <input
                              className="input-base w-full p-3 bg-white"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="User Profile"
                              required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-bold text-azure-65 uppercase tracking-widest italic">
                                Endpoint Path
                            </label>
                            <input
                              className="input-base w-full p-3 opacity-40 bg-grey-91 cursor-not-allowed text-azure-34"
                              value={`/mock/users/p_${(session?.user as any)?.id?.slice(-6) || "..."}`}
                              readOnly
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-bold text-azure-65 uppercase tracking-widest italic">
                                Description
                            </label>
                            <textarea
                              className="input-base w-full h-44 resize-none p-4 bg-white"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              placeholder="Primary user profile object..."
                            />
                        </div>

                        <div className="info-box italic">
                            <span className="text-blue-59 font-bold">i</span>
                            <p className="text-[11px] leading-relaxed">
                                Tip: You can paste a JSON object directly into the definition panel on the right.
                                The builder will automatically validate the structure.
                            </p>
                        </div>
                    </div>

                    <div className="card-base flex flex-col h-[650px] overflow-hidden">
                        <div className="px-8 py-4 border-b border-grey-91 flex justify-between items-center bg-white">
                            <h2 className="text-azure-11 text-lg font-bold">Schema Definition</h2>
                            <span className={`status-badge ${isValidJson ? 'status-valid' : 'status-invalid'} text-[10px] uppercase font-bold tracking-widest px-4 py-1.5`}>
                                {isValidJson ? 'Valid JSON' : 'Invalid JSON'}
                            </span>
                        </div>

                        <textarea
                          className="flex-grow p-10 font-mono text-sm outline-none resize-none bg-white text-azure-17 leading-relaxed"
                          value={jsonContent}
                          onChange={(e) => setJsonContent(e.target.value)}
                          spellCheck={false}
                          placeholder='{ "key": "value" }'
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}