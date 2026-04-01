"use client";
import React, { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import Link from "next/link";

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

    const copyToClipboard = () => {
        navigator.clipboard.writeText(project.apiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

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
            </div>

            <div className="flex gap-3">
                <Link href={`/start/projects/${project._id}`} className="btn-primary">
                  Öppna
                </Link>

                <button onClick={copyToClipboard} className="btn-secondary">
                    {copied ? (
                        <>
                          <Check size={16} className="text-green-36" />
                          Kopierad!
                        </>
                    ) : (
                        <>
                          <Copy size={16} />
                          Kopiera nyckel
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}