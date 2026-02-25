"use client";

import Link from "next/link";
import { useState } from "react";

type Mode = "login" | "register";
type AuthFormValues = { mode: Mode; email: string; password: string };
type LogRegComponentProps = { mode: Mode; onSubmit?: (values: AuthFormValues) => void };

export default function LogRegComponent({ mode, onSubmit }: LogRegComponentProps) {
    const isLogin = mode === "login";
    const title = isLogin ? "Logga in" : "Skapa konto";
    const buttonText = isLogin ? "Logga in" : "Skapa konto";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onSubmit?.({ mode, email, password });
        console.log(mode, email);
    }
    // Saker att eventuellt lägga till:
    // Passera handleOAuth som prop kanske blir enklare att testa och mer flexibelt
    function handleOAuth() {
        console.log("OAuth");
    }

    return (
        <section className="w-full max-w-md">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>

                <div className="mt-4 rounded-xl bg-gray-100 p-1">
                    <div className="relative grid grid-cols-2 gap-1">
                        <span
                            aria-hidden="true"
                            className={[
                                "pointer-events-none absolute inset-y-0 left-0 z-0 w-1/2 rounded-lg bg-white shadow-sm",
                                "transform transition-transform duration-300 ease-out",
                                isLogin ? "translate-x-0" : "translate-x-full",
                            ].join(" ")}
                        />

                        <Link
                            href="/start/login"
                            aria-current={isLogin ? "page" : undefined}
                            className={[
                                "relative z-10 rounded-lg px-3 py-2 text-center text-sm font-medium",
                                "transition-colors transition-discrete duration-300",
                                isLogin ? "text-gray-900" : "text-gray-600",
                            ].join(" ")}
                        >
                            Logga in
                        </Link>

                        <Link
                            href="/start/register"
                            aria-current={!isLogin ? "page" : undefined}
                            className={[
                                "relative z-10 rounded-lg px-3 py-2 text-center text-sm font-medium",
                                "transition-colors transition-discrete duration-300",
                                !isLogin ? "text-gray-900" : "text-gray-600",
                            ].join(" ")}
                        >
                            Skapa konto
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            name="email"
                            inputMode="email"
                            autoComplete="email"
                            required
                            type="email"
                            placeholder="student@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10 placeholder:text-gray-300 text-neutral-800"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Lösenord</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete={isLogin ? "current-password" : "new-password"}
                            required
                            placeholder="password123"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10 placeholder:text-gray-300 text-neutral-800"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white"
                    >
                        {buttonText}
                    </button>

                    <button
                        type="button"
                        onClick={handleOAuth}
                        className="w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-medium text-white hover:bg-slate-900"
                    >
                        Use OAuth
                    </button>

                    <p className="pt-2 text-xs text-gray-500">
                        I slutgiltiga: Använder OAuth lösenord hash:as + sparas i DB och login ger JWT.
                    </p>
                </form>
            </div>
        </section>
    );
}