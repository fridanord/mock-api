"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Loader2, Plus, Folder } from "lucide-react";

interface Project {
  _id: string;
  name: string;
  description?: string;
}

export default function ProjectsPage() {
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userId = (session?.user as any)?.id;

    const fetchProjects = async (id: string) => {
      try {
        const response = await fetch(`/api/projects?ownerId=${id}`);
        if (!response.ok) throw new Error();
        
        const data = await response.json();
        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "authenticated" && userId) {
      fetchProjects(userId);
    } else if (status === "unauthenticated" || (status === "authenticated" && !userId)) {
      setIsLoading(false);
    }
  }, [session, status]);

  if (status === "loading" || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-azure-11" size={40} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-y-auto p-8 bg-slate-50 font-figtree">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-azure-11 tracking-tight">Projects</h1>
            <p className="text-azure-34 text-sm mt-2">
              Hanterar projekt för <span className="font-semibold">{session?.user?.email}</span>
            </p>
          </div>
          <Link
            href="/start/projects/new"
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={18} />
            Skapa project
          </Link>
        </div>

        <div className="card-base">
          <div className="border-b border-grey-91 px-6 py-5">
            <h2 className="text-azure-11 font-semibold uppercase tracking-wider text-xs">
              Dina projekt ({projects.length})
            </h2>
          </div>

          <div className="divide-y divide-grey-91">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div 
                  key={project._id} 
                  className="flex flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between hover:bg-grey-96 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-50 text-azure-11 rounded-lg group-hover:bg-azure-11 group-hover:text-white transition-colors">
                      <Folder size={20} />
                    </div>
                    <div>
                      <h3 className="text-azure-11 font-medium">{project.name}</h3>
                      <p className="text-azure-34 text-xs">
                        {project.description || "Ingen beskrivning."}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Link 
                      href={`/start/endpoints?projectId=${project._id}`}
                      className="btn-secondary"
                    >
                      Öppna
                    </Link>
                    <button className="btn-delete">
                      Ta bort
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center">
                <p className="text-azure-34 italic text-sm">
                  Inga projekt hittades. Skapa ditt första projekt för att börja!
                </p>
              </div>
            )}
          </div>

          <div className="card-footer">
            Här visas alla projekt kopplade till ditt konto.
          </div>
        </div>
      </div>
    </div>
  );
}