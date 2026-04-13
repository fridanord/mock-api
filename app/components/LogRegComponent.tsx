"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import AuthSpinner from "./AuthSpinner";
type Mode = "login" | "register";
type AuthFormValues = { mode: Mode; email: string; password: string };
type LogRegComponentProps = { mode: Mode; onSubmit?: (values: AuthFormValues) => void };

export default function LogRegComponent({ mode, onSubmit }: LogRegComponentProps) {
    const isLogin = mode === "login";
    const title = isLogin ? "Logga in" : "Skapa konto";
    const buttonText = isLogin ? "Logga in" : "Skapa konto";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    // function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    //     e.preventDefault();
    //     onSubmit?.({ mode, email, password });
    //     console.log(mode, email);
    // }


async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
 setError("");
 setLoading(true);
    if (mode === "register") {
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Kunde inte registrera användaren.");
               setLoading(false);
                return;
            }

            alert("Konto skapat! Du kan nu logga in.");
            setLoading(false);
            return;
        } catch (error) {
            console.error(error);
            alert("Något gick fel vid registrering.");
            setLoading(false);
            return;
        }
    }

    // if (mode === "login") {
    //     await signIn("credentials", {
    //         email,
    //         password,
    //         callbackUrl: "/start",
    //     });
    // }
    const result = await signIn("credentials", {
  email,
  password,
  redirect: false,
});

if (result?.error) {
  setError("Fel email eller lösenord");
  setLoading(false);
  return;
}

if (result?.ok) {
  window.location.href = "/start";
  return;
}
setLoading(false);
}


    // Saker att eventuellt lägga till:
    // Passera handleOAuth som prop kanske blir enklare att testa och mer flexibelt
    // function handleOAuth() {
    //     console.log("OAuth");
    // }

    return (
        <section className="w-full max-w-md mt-16">
           <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-lg">
                <h1 className="text-2xl font-semibold text-[var(--color-text-main)]">{title}</h1>

                <div className="mt-4 rounded-xl bg-[var(--color-surface-muted)] p-1 border border-[var(--color-border)]">
                    <div className="relative grid grid-cols-2 gap-1">
                        <span
                            aria-hidden="true"
                            className={[
                               "pointer-events-none absolute inset-y-0 left-0 z-0 w-1/2 rounded-lg shadow-sm",
                "transform transition-transform duration-300 ease-out",
                "bg-[var(--color-surface)] border border-[var(--color-border)]",
                isLogin ? "translate-x-0" : "translate-x-full",
                            ].join(" ")}
                        />

                        <Link
                            href="/start/login"
                            aria-current={isLogin ? "page" : undefined}
                            className={[
                               "relative z-10 rounded-lg px-3 py-2 text-center text-sm font-medium transition-colors duration-300",
                isLogin
                  ? "text-[var(--color-text-main)]"
                  : "text-[var(--color-text-muted)]",
                            ].join(" ")}
                        >
                            
                            Logga in
                        </Link>

                        <Link
                            href="/start/register"
                            aria-current={!isLogin ? "page" : undefined}
                            className={[
                                 "relative z-10 rounded-lg px-3 py-2 text-center text-sm font-medium transition-colors duration-300",
                !isLogin
                  ? "text-[var(--color-text-main)]"
                  : "text-[var(--color-text-muted)]",
                            ].join(" ")}
                        >
                            Skapa konto
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-[var(--color-text-main)]">Email</label>
                        <input
                            id="email"
                            name="email"
                            inputMode="email"
                            autoComplete="email"
                            required
                            type="email"
                            placeholder="student@example.com"
                            value={email}
                            onChange={(e) => {setEmail(e.target.value);
                                setError("");
                            }}
                            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm outline-none placeholder:text-[var(--color-text-muted)] text-[var(--color-text-main)] focus:ring-2 focus:ring-[var(--color-blue-59)]/20"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium  text-[var(--color-text-main)]">Lösenord</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete={isLogin ? "current-password" : "new-password"}
                            required
                            placeholder="password123"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value);
                                setError("");
                            }}
                           className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm outline-none placeholder:text-[var(--color-text-muted)] text-[var(--color-text-main)] focus:ring-2 focus:ring-[var(--color-blue-59)]/20"
            />
                    </div>
                    {error && (
  <div className="status-invalid status-badge mt-2">
    {error}
  </div>
)}

                     <button type="submit" disabled={loading} className="btn-primary w-full justify-center  disabled:cursor-not-allowed disabled:opacity-70">
            {/* {buttonText} */}
             {loading ? <AuthSpinner /> : buttonText}
          </button>

                    <button
            type="button"
            disabled={loading}
            onClick={() => signIn("google", { callbackUrl: "/start" })}
            className="btn-secondary w-full justify-center disabled:cursor-not-allowed disabled:opacity-70"
          >
            Login with Google
          </button>

                    <p className="pt-2 text-xs text-[var(--color-text-muted)]">
                        I slutgiltiga: Använder OAuth lösenord hash:as + sparas i DB och login ger JWT.
                    </p>
                </form>
            </div>
        </section>
    );
}