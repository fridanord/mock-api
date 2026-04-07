"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2, ArrowLeft } from "lucide-react";

export default function EditProjectPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const { id } = useParams();
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [jsonContent, setJsonContent] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isValidJson, setIsValidJson] = useState(true);

    /* Hämtar befintligt projektdata baserat på ID i url:en, 
    strängdefinerar initialSchema för att kunna visa det i en textarea */
    useEffect(() => {
        const fetchProject = async () => {
            if (!id) return;
            try {
                const res = await fetch(`/api/projects/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setName(data.name || "");
                    setDescription(data.description || "");
                    
                    if (data.initialSchema) {
                        setJsonContent(JSON.stringify(data.initialSchema, null, 2));
                    }
                }
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    /* Realtidsvalidering av JSON-input, hindrar att vi skickar korrupt data till databasen */
    useEffect(() => {
        if (!jsonContent || jsonContent.trim() === "") {
            setIsValidJson(true);
            return;
        }
        try {
            JSON.parse(jsonContent);
            setIsValidJson(true);
        } catch {
            setIsValidJson(false);
        }
    }, [jsonContent]);

    /* Uppdaterar projektet via PUT-anrop, parsar tillbaka JSON-strängen till ett objekt innan vi sparar */
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!name || !jsonContent.trim()) {
            return;
        }

        if (!isValidJson) {
            alert("JSON-strukturen är inte giltig.");
            return;
        }

        setIsSaving(true);

        try {
            const res = await fetch(`/api/projects/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    description,
                    initialSchema: JSON.parse(jsonContent),
                }),
            });

            if (res.ok) {
                router.push("/start/projects");
                router.refresh();
            }
        } catch (error) {
            console.error("Update error:", error);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-grey-96">
                <Loader2 className="animate-spin text-azure-65" size={40} />
            </div>
        );
    }

    return (
        <section className="h-full w-full bg-grey-96 p-8 font-figtree text-azure-11">
            <div className="mx-auto max-w-7xl">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <button onClick={() => router.back()} className="btn-ghost mb-2 flex items-center gap-2">
                            <ArrowLeft size={16} /> Tillbaka
                        </button>
                        <h1 className="text-3xl font-bold">Redigera schema</h1>
                        <p className="text-azure-34 text-sm mt-1 italic font-medium">Projekt: {name}</p>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => router.back()} className="btn-secondary px-8 py-2">
                            Avbryt
                        </button>
                        <button
                          onClick={handleUpdate}
                          className="btn-primary px-10 py-2 flex items-center gap-2"
                          disabled={isSaving || !name || !isValidJson || !jsonContent.trim()}
                        >
                            {isSaving ? <Loader2 className="animate-spin" size={18} /> : "Spara"}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="card-base p-10 space-y-8 bg-white">
                        <h2 className="text-lg font-bold">Basic Settings</h2>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-bold text-azure-65 uppercase tracking-widest italic">Schema Name</label>
                            <input
                              className="input-base w-full p-3 bg-white"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Project Name"
                              required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-bold text-azure-65 uppercase tracking-widest italic">Endpoint Path</label>
                            <input
                              className="input-base w-full p-3 opacity-40 bg-grey-91 cursor-not-allowed text-azure-34"
                              value={`/mock/users/p_${id?.toString().slice(-6)}`}
                              readOnly
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-bold text-azure-65 uppercase tracking-widest italic">Description</label>
                            <textarea
                              className="input-base w-full h-44 resize-none p-4 bg-white"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              placeholder="Description..."
                            />
                        </div>

                        <div className="info-box italic flex gap-3 p-4 bg-blue-50/30 rounded-lg">
                            <span className="text-blue-59 font-bold italic">i</span>
                            <p className="text-[11px] leading-relaxed text-azure-34">
                                Tip: You can paste a JSON object directly into the definition panel on the right.
                                The builder will automatically validate the structure.
                            </p>
                        </div>
                    </div>

                    <div className="card-base flex flex-col h-650px overflow-hidden bg-white">
                        <div className="px-8 py-4 border-b border-grey-91 flex justify-between items-center bg-white">
                            <h2 className="text-lg font-bold">Schema Definition</h2>
                            <span className={`status-badge ${isValidJson ? 'status-valid' : 'status-invalid'} text-[10px] uppercase font-bold tracking-widest px-4 py-1.5`}>
                                {isValidJson ? 'Valid JSON' : 'Invalid JSON'}
                            </span>
                        </div>

                        <textarea
                          className="grow p-10 font-mono text-sm outline-none resize-none bg-white text-azure-17 leading-relaxed focus:ring-0"
                          value={jsonContent}
                          onChange={(e) => setJsonContent(e.target.value)}
                          spellCheck={false}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}