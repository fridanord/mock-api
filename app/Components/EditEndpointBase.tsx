"use client";

import { useEffect, useState } from "react";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type EditEndpointBaseProps = {
    initialMethod?: Method;
    initialPath?: string;
    initialGenerateList?: boolean;
    initialListCount?: number;
    onChange?: (values: { method: Method; path: string; generateList: boolean; listCount: number }) => void;
};

const METHODS: Method[] = ["GET", "POST", "PUT", "PATCH", "DELETE"];

export default function EditEndpointBaseInfo({
    initialMethod = "GET",
    initialPath = "/",
    initialGenerateList = false,
    initialListCount = 0,
    onChange,
}: EditEndpointBaseProps) {
    const [method, setMethod] = useState<Method>(initialMethod);
    const [path, setPath] = useState(initialPath);
    const [generateList, setGenerateList] = useState(initialGenerateList);
    const [listCount, setListCount] = useState(initialListCount);

    // Bubble up changes if a handler is provided
    useEffect(() => {
        onChange?.({ method, path, generateList, listCount });
    }, [method, path, generateList, listCount, onChange]);

    return (
        <section className="card-base p-6 space-y-6">
            <div className="space-y-1">
                <h2 className="text-xl font-semibold text-azure-27">Grundinställningar</h2>
                <p className="text-sm text-azure-65">Basinställningar för ditt endpoint-svar.</p>
            </div>

            <div className="grid gap-4">
                <label className="space-y-2">
                    <span className="text-sm font-medium text-azure-27">Method</span>
                    <select
                        className="input-base w-full"
                        value={method}
                        onChange={(e) => setMethod(e.target.value as Method)}
                    >
                        {METHODS.map((m) => (
                            <option key={m}>{m}</option>
                        ))}
                    </select>
                </label>

                <label className="space-y-2">
                    <span className="text-sm font-medium text-azure-27">Path</span>
                    <input
                        className="input-base w-full"
                        value={path}
                        onChange={(e) => setPath(e.target.value)}
                        placeholder="/users"
                    />
                </label>

                <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4 rounded-card border border-grey-91 bg-grey-98 p-3">
                        <div className="space-y-1">
                            <span className="text-sm font-medium text-azure-27">Generera lista?</span>
                            <p className="text-xs text-azure-65">Om på: 200-svaret blir en array</p>
                        </div>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={generateList}
                            onClick={() => setGenerateList((v) => !v)}
                            className={[
                                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                                generateList ? "bg-azure-11" : "bg-azure-84",
                            ].join(" ")}
                        >
                            <span
                                className={[
                                    "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
                                    generateList ? "translate-x-5" : "translate-x-0.5",
                                ].join(" ")}
                            />
                        </button>
                    </div>
                </div>

                <label className="space-y-2">
                    <span className="text-sm font-medium text-azure-27">Antal i lista</span>
                    <input
                        type="number"
                        min={1}
                        max={50}
                        className="input-base w-24"
                        value={listCount}
                        onChange={(e) => setListCount(Math.max(1, Math.min(50, Number(e.target.value) || 1)))}
                    />
                </label>
            </div>

            <div className="info-box text-sm">
                <span className="text-blue-59">ℹ️</span>
                <span>Tips: börja med GET + 200/500. Lägg till POST/PUT-validering senare.</span>
            </div>
        </section>
    );
}