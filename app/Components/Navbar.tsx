"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
    <nav className="flex w-auto flex-col items-start px-6 lg:px-24 2xl:px-[30rem] bg-[var(--color-surface)] border-b border-[var(--color-border)]">
      <section className="flex h-16 w-full items-center justify-between">
        <div className="flex items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-grey-91)]">
            <span className="text-center text-base font-bold leading-6 text-[var(--color-text-main)]">
              M
            </span>
          </div>

          <div className="flex flex-col items-start pl-3">
            <div className="flex flex-col items-start">
              <h1 className="flex w-full flex-col items-start text-sm font-bold leading-[1.09375rem] text-[var(--color-text-main)]">
                Mockdata.API
              </h1>
              <p className="text-xs text-[var(--color-text-muted)]">
                Frontend Prototyp v1
              </p>
            </div>
          </div>
        </div>

        <section className="flex items-center gap-3">
          <div className="flex flex-col items-start">
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

          <div>
            <button
              type="button"
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-border)] text-[var(--color-text-main)] hover:bg-[var(--color-grey-91)] transition-colors"
            >
              {darkMode ? (
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2" />
                  <path d="M12 21v2" />
                  <path d="M4.22 4.22l1.42 1.42" />
                  <path d="M18.36 18.36l1.42 1.42" />
                  <path d="M1 12h2" />
                  <path d="M21 12h2" />
                  <path d="M4.22 19.78l1.42-1.42" />
                  <path d="M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3c0 .27-.01.54-.01.81A9 9 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>

          <div>
            {session?.user ? (
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/start" })}
                className="inline-flex h-9 items-center rounded-md border border-[var(--color-border)] px-4 text-sm font-medium text-[var(--color-text-main)] hover:bg-[var(--color-grey-91)] transition-colors"
              >
                Logga ut
              </button>
            ) : (
              <button
                type="button"
                onClick={() => router.push("/start/login")}
                className="inline-flex h-9 items-center rounded-md border border-[var(--color-border)] px-4 text-sm font-medium text-[var(--color-text-main)] hover:bg-[var(--color-grey-91)] transition-colors"
              >
                Logga in
              </button>
            )}
          </div>
        </section>
      </section>
    </nav>
  );
}