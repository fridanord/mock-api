"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ProjectCard from "@/app/Components/ProjectCard";
import { Loader2, Plus, PlusCircle } from "lucide-react";
import Link from "next/link";

type Project = {
  _id: string;
  name: string;
  apiKey: string;
  endpointCount?: number;
};

type SessionUser = {
  id?: string;
  email?: string | null;
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      if (status === "authenticated") {
        try {
          const user = session?.user as SessionUser | undefined;
          const userId = user?.id;

          if (!userId) {
            setIsLoading(false);
            return;
          }

          const res = await fetch(`/api/projects?ownerId=${userId}`);
          if (!res.ok) {
            throw new Error("Failed to fetch projects");
          }

          const data: Project[] = await res.json();
          setProjects(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      } else if (status !== "loading") {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [status, session]);

  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-azure-65" size={40} />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="flex justify-between items-start mb-12">
        <div>
          <h1 className="text-azure-11 mb-1">Dashboard</h1>
          <p className="text-azure-34 text-sm font-medium">
            Hej, <span className="text-azure-11">{session?.user?.email}</span>
          </p>
        </div>

        <Link href="/start/projects/new" className="btn-primary">
          <Plus size={18} /> Skapa nytt projekt
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {projects.length > 0 ? (
          <>
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}

            <Link
              href="/start/projects/new"
              className="w-full py-16 border-2 border-dashed border-grey-91 rounded-card flex flex-col items-center justify-center gap-3 text-azure-65 hover:bg-white hover:border-azure-84 hover:text-azure-34 transition-all group mt-4"
            >
              <PlusCircle
                size={32}
                className="group-hover:scale-110 transition-transform text-azure-84"
              />
              <span className="text-sm font-bold uppercase tracking-widest">
                Skapa ett nytt projekt
              </span>
            </Link>
          </>
        ) : (
          <div className="text-center py-20 bg-grey-98 rounded-card border border-grey-91">
            <PlusCircle className="mx-auto text-azure-84 mb-4" size={48} />
            <h3 className="text-azure-27 mb-2">Inga projekt hittades</h3>
            <p className="text-azure-65 text-sm mb-6">
              Börja med att skapa ditt första projekt för att generera API-nycklar.
            </p>
            <Link href="/start/projects/new" className="btn-primary mx-auto w-fit">
              Kom igång här
            </Link>
          </div>
        )}
      </div>

      <footer className="mt-20 border-t border-grey-91 pt-8">
        <p className="text-center text-[10px] text-azure-84 font-bold uppercase tracking-[0.2em] leading-loose max-w-sm mx-auto">
        </p>
      </footer>
    </div>
  );
}