"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

export default function NewProjectPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const userId = (session?.user as any)?.id;

        try {

            const res = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, description, ownerId: userId }),
            });

            if (res.ok) {
                router.push("/start/projects");
                router.refresh();
            }
        } catch (error) {
            console.error("Error creating project:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto font-figtree">
            <button
              onClick={() => router.back()}
              className="text-azure-34 mb-4 text-sm hover:text-azure-11 transitions-colors"
            >
                ← Tillbaka till dashboard
            </button>

            <h1 className="text-azure-11 text-2xl font-bold mb-6">Skapa nytt projekt</h1>

            <form onSubmit={handleSubmit} className="card-base p-8 flex flex-col gap-6">
                <div>
                    <label className="block text-sm font-bold text-azure-11 mb-2 italic">Projektnamn</label>
                    <input
                      className="w-full border border-grey-91 p-3 rounded-lg focus:outline-none focus:border-azure-11 transition-colors"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="t.ex. Min Webshop API"
                      required
                      disabled={isSubmitting}
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-azure-11 mb-2 italic">Beskrivning (valfritt)</label>
                    <textarea
                      className="w-full border border-grey-91 p-3 rounded-lg h-32 focus:outline-none focus:border-azure-11 transition-colors resize-none"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Vad ska detta API användas till?"
                      disabled={isSubmitting}
                    />
                </div>

                <div className="flex justify-end gap-4 mt-2">
                    <button
                      type="button"
                      onClick={() => router.back()}
                      className="btn-secondary px-6"
                      disabled={isSubmitting}
                      >
                        Avbryt
                      </button>
                      <button
                        type="submit"
                        className="btn-primary px-6 flex items-center gap-2"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : "Spara och fortsätt"}
                    </button>
                </div>
            </form>
        </div>
    )
}