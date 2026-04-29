"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = !darkMode;
    setDarkMode(nextTheme);

    if (nextTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav className="w-full border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <section className="flex h-28 w-full items-center justify-between px-6 lg:px-10">
        
        {/* LEFT SIDE */}
        <div className="flex items-center gap-4 -ml-1">
          <Link href="/start" className="flex items-center">
            <img
              src="/logo2.svg"
              alt="MockAPI logga"
              className="h-20 w-auto object-contain scale-[2.2]"
            />
          </Link>

          <div className="flex flex-col justify-center">
            <h1 className="text-lg font-bold text-[var(--color-text-main)] leading-tight">
              Mockdata.API
            </h1>
            <p className="text-sm text-[var(--color-text-muted)]">
              Frontend Prototyp v1
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <section className="flex items-center gap-4">
          <div>
            {status === "loading" ? (
              <p className="text-sm text-[var(--color-text-muted)]">Laddar...</p>
            ) : session?.user ? (
              <p className="text-sm text-[var(--color-text-muted)]">
                {session.user.email}
              </p>
            ) : (
              <p className="text-sm text-[var(--color-text-muted)]">
                Inte inloggad
              </p>
            )}
          </div>

          {/* THEME BUTTON */}
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--color-border)] text-[var(--color-text-main)] hover:bg-[var(--color-grey-91)] transition-colors"
          >
            {darkMode ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3" />
              </svg>
            )}
          </button>

          {/* AUTH BUTTON */}
          {session?.user ? (
            <button
              onClick={() => signOut({ callbackUrl: "/start" })}
              className="inline-flex h-10 items-center rounded-md border border-[var(--color-border)] px-5 text-sm font-medium text-[var(--color-text-main)] hover:bg-[var(--color-grey-91)] transition-colors"
            >
              Logga ut
            </button>
          ) : (
            <button
              onClick={() => router.push("/start/login")}
              className="inline-flex h-10 items-center rounded-md border border-[var(--color-border)] px-5 text-sm font-medium text-[var(--color-text-main)] hover:bg-[var(--color-grey-91)] transition-colors"
            >
              Logga in
            </button>
          )}
        </section>
      </section>
    </nav>
  );
}