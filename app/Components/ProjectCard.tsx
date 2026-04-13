"use client";
import { useRouter } from "next/navigation";
import { EndpointEditButton } from "./EndpointsButtons";
import { useState } from "react";
import { Copy, Check, Trash2 } from "lucide-react";
import Link from "next/link";
import DeleteModal from "./DeleteModal";

interface ProjectCardProps {
    project: {
        _id: string;
        name: string;
        apiKey: string;
        endpointCount?: number;
    };
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const [copied, setCopied] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const router = useRouter();

    const copyToClipboard = () => {
        navigator.clipboard.writeText(project.apiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDeleteConfirm = async () => {
        try {
            const res = await fetch(`/api/projects/${project._id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                window.location.reload();
            } else {
                alert("Kunde inte radera projektet");
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    }

    return (
        <div className="card-base p-8 mb-6 relative group hover:border-azure-65 transition-all">
            <span className="absolute top-6 right-8 text-[10px] font-bold text-azure-65 bg-grey-96 px-2 py-1 rounded-sm uppercase">
                {project.endpointCount || 0} endpoints
            </span>

            <div className="mb-8">
                <h3 className="text-azure-11 mb-1">{project.name}</h3>
                <code className="text-sm text-azure-65 font-mono bg-grey-98 px-2 py-0.5 rounded">
                    API Key: {project.apiKey}
                </code>
                <button
                   onClick={copyToClipboard}
                   className="p-1.5 hover:bg-grey-91 rounded-md transition-colors group/copy"
                   title="Kopiera API-nyckel"
                >
                    {copied? (
                        <Check size={16} className="text-green-36 animate-in zoom-in duration-200" />
                    ) : (
                        <Copy size={16} className="text-azure-84 group-hover/copy:text-azure-65 transition-colors" />
                    )}
                </button>
            </div>

            <div className="flex gap-3">
                {/* Den här länken kommer behöva peka på `/start/projects/${project._id}`, just nu pekar den bara på den mockade prototypen för att visa flödet*/}
                <Link href="/start/endpoints" className="btn-primary">
                  Öppna
                </Link>

                <EndpointEditButton
                   onClick={() => router.push(`/start/projects/${project._id}/edit`)}
                />

                <button
                   onClick={() => setIsDeleteModalOpen(true)}
                   className="btn-delete"
                   title="Radera projekt"
                >
                    <Trash2 size={18} />
                </button>
            </div>

            <DeleteModal
               isOpen={isDeleteModalOpen}
               onClose={() => setIsDeleteModalOpen(false)}
               onConfirm={handleDeleteConfirm}
               title="Radera projektet?"
               description={`Är du säker på att du vill radera "${project.name}"? All data kommer att tas bort permanent.`}
            />
        </div>
    );
}