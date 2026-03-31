"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ResponseSummary = {
    id: string;
    scenarioId: string;
    status: number;
    bodyTemplate: unknown;
};

export type ScenarioSummary = {
    id: string;
    endpointId: string;
    name: string;
    response: ResponseSummary;
};

export type EndpointSummary = {
    id: string;
    projectId: string;
    method: HttpMethod;
    path: string;
    description?: string;
    scenarios: ScenarioSummary[];
};

type ScenarioPickerCardProps = {
    endpoints: EndpointSummary[];
    onEndpointChange?: (endpoint: EndpointSummary) => void;
    onScenarioChange?: (scenario: ScenarioSummary) => void;
    onCreateEndpoint?: () => void;
    onCreateScenario?: (endpoint: EndpointSummary) => void;
};

type PopoverPosition = {
    top: number;
    left: number;
    width: number;
    placement: "bottom" | "top";
};

const methodBadgeClass: Record<HttpMethod, string> = {
    GET: "badge-get",
    POST: "badge-post",
    PUT: "badge-put",
    PATCH: "badge-patch",
    DELETE: "badge-delete",
};

const POPOVER_OFFSET = 12;
const POPOVER_MIN_HEIGHT = 260;

export default function ScenarioPickerCard({
    endpoints,
    onEndpointChange,
    onScenarioChange,
    onCreateEndpoint,
    onCreateScenario,
}: ScenarioPickerCardProps) {
    const [isEndpointOpen, setIsEndpointOpen] = useState(false);
    const [isScenarioOpen, setIsScenarioOpen] = useState(false);
    const [selectedEndpointId, setSelectedEndpointId] = useState(endpoints[0]?.id ?? "");
    const [selectedScenarioId, setSelectedScenarioId] = useState(
        endpoints[0]?.scenarios[0]?.id ?? ""
    );

    const endpointTriggerRef = useRef<HTMLButtonElement | null>(null);
    const scenarioTriggerRef = useRef<HTMLButtonElement | null>(null);
    const endpointPopoverRef = useRef<HTMLDivElement | null>(null);
    const scenarioPopoverRef = useRef<HTMLDivElement | null>(null);

    const activeEndpoint = useMemo(
        () => endpoints.find((endpoint) => endpoint.id === selectedEndpointId) ?? endpoints[0],
        [endpoints, selectedEndpointId]
    );

    const activeScenario = useMemo(() => {
        if (!activeEndpoint) return undefined;

        return (
            activeEndpoint.scenarios.find((scenario) => scenario.id === selectedScenarioId) ??
            activeEndpoint.scenarios[0]
        );
    }, [activeEndpoint, selectedScenarioId]);

    const [endpointPosition, setEndpointPosition] = useState<PopoverPosition | null>(null);
    const [scenarioPosition, setScenarioPosition] = useState<PopoverPosition | null>(null);

    useEffect(() => {
        if (!isEndpointOpen) return;

        const updatePosition = () => {
            if (!endpointTriggerRef.current) return;
            setEndpointPosition(getPopoverPosition(endpointTriggerRef.current));
        };

        updatePosition();
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition, true);

        return () => {
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition, true);
        };
    }, [isEndpointOpen]);

    useEffect(() => {
        if (!isScenarioOpen) return;

        const updatePosition = () => {
            if (!scenarioTriggerRef.current) return;
            setScenarioPosition(getPopoverPosition(scenarioTriggerRef.current));
        };

        updatePosition();
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition, true);

        return () => {
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition, true);
        };
    }, [isScenarioOpen]);

    useEffect(() => {
        if (!isEndpointOpen && !isScenarioOpen) return;

        const onPointerDown = (event: MouseEvent) => {
            const target = event.target as Node;

            const clickedEndpointTrigger = endpointTriggerRef.current?.contains(target);
            const clickedScenarioTrigger = scenarioTriggerRef.current?.contains(target);
            const clickedEndpointPopover = endpointPopoverRef.current?.contains(target);
            const clickedScenarioPopover = scenarioPopoverRef.current?.contains(target);

            if (
                clickedEndpointTrigger ||
                clickedScenarioTrigger ||
                clickedEndpointPopover ||
                clickedScenarioPopover
            ) {
                return;
            }

            setIsEndpointOpen(false);
            setIsScenarioOpen(false);
        };

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsEndpointOpen(false);
                setIsScenarioOpen(false);
            }
        };

        window.addEventListener("mousedown", onPointerDown);
        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("mousedown", onPointerDown);
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [isEndpointOpen, isScenarioOpen]);

    const handleEndpointSelect = (endpoint: EndpointSummary) => {
        const nextScenario = endpoint.scenarios[0];

        setSelectedEndpointId(endpoint.id);
        setSelectedScenarioId(nextScenario?.id ?? "");
        setIsEndpointOpen(false);
        setIsScenarioOpen(false);

        onEndpointChange?.(endpoint);

        if (nextScenario) {
            onScenarioChange?.(nextScenario);
        }
    };

    const handleScenarioSelect = (scenario: ScenarioSummary) => {
        setSelectedScenarioId(scenario.id);
        setIsScenarioOpen(false);
        onScenarioChange?.(scenario);
    };

    if (!activeEndpoint) return null;

    return (
        <>
            <section className="relative w-full max-w-[320px] rounded-3xl border border-blue-89 bg-white px-6 pb-8 pt-12 shadow-[0_20px_50px_rgba(99,102,241,0.12)]">

                <div className="mb-8 flex justify-center">
                    <div className="grid h-16 w-16 place-items-center rounded-2xl border border-blue-89 bg-grey-97 shadow-sm">
                        <div className="h-6 w-6 rounded-md bg-blue-67/20" />
                    </div>
                </div>

                <div>
                    <button
                        ref={endpointTriggerRef}
                        type="button"
                        onClick={() => {
                            setIsEndpointOpen((open) => !open);
                            setIsScenarioOpen(false);
                        }}
                        className="flex w-full items-center gap-3 rounded-2xl border border-blue-89 bg-white px-4 py-3 shadow-sm"
                    >
                        <span className={`method-badge ${methodBadgeClass[activeEndpoint.method]}`}>
                            {activeEndpoint.method}
                        </span>

                        <span className="flex-1 text-left text-[18px] font-semibold text-azure-11">
                            {activeEndpoint.path}
                        </span>

                        <Chevron open={isEndpointOpen} />
                    </button>

                    {activeEndpoint.description && (
                        <p className="mt-4 text-center text-sm text-azure-65">
                            {activeEndpoint.description}
                        </p>
                    )}
                </div>

                <div className="mt-10 rounded-2xl border border-grey-91 bg-grey-98 p-4">
                    <div className="mb-3 flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-azure-65">
                            Active Scenario
                        </span>

                        <button
                            type="button"
                            className="text-xs font-medium text-blue-67"
                            onClick={() => activeEndpoint && onCreateScenario?.(activeEndpoint)}
                        >
                            Edit
                        </button>
                    </div>

                    {activeScenario ? (
                        <div>
                            <button
                                ref={scenarioTriggerRef}
                                type="button"
                                onClick={() => {
                                    setIsScenarioOpen((open) => !open);
                                    setIsEndpointOpen(false);
                                }}
                                className="flex w-full items-center gap-3 rounded-2xl border border-blue-89 bg-white px-4 py-4 shadow-sm"
                            >
                                <StatusDot status={activeScenario.response.status} />
                                <span className="flex-1 text-left">
                                    <span className="block text-lg font-semibold text-azure-11">
                                        {activeScenario.name}
                                    </span>
                                    <span className="block text-sm text-azure-65">
                                        Returns {activeScenario.response.status}{" "}
                                        {statusLabel(activeScenario.response.status)}
                                    </span>
                                </span>
                                <Chevron open={isScenarioOpen} />
                            </button>
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-grey-91 bg-white px-4 py-6 text-sm text-azure-65">
                            No scenarios yet
                        </div>
                    )}
                </div>
            </section>

            <PopoverMenu
                open={isEndpointOpen}
                position={endpointPosition}
                popoverRef={endpointPopoverRef}
            >
                <div className="overflow-hidden rounded-2xl border border-grey-91 bg-white shadow-[0_20px_40px_rgba(17,24,39,0.14)]">
                    <div className="border-b border-grey-91 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-azure-65">
                        Switch Endpoint
                    </div>

                    <div className="p-3">
                        {endpoints.map((endpoint) => {
                            const isActive = endpoint.id === activeEndpoint.id;

                            return (
                                <button
                                    key={endpoint.id}
                                    type="button"
                                    onClick={() => handleEndpointSelect(endpoint)}
                                    className={[
                                        "mb-2 flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left",
                                        isActive ? "bg-grey-97" : "hover:bg-grey-98",
                                    ].join(" ")}
                                >
                                    <span className={`method-badge mt-0.5 ${methodBadgeClass[endpoint.method]}`}>
                                        {endpoint.method}
                                    </span>

                                    <span className="flex-1">
                                        <span className="block font-semibold text-azure-11">
                                            {endpoint.path}
                                        </span>
                                        <span className="block text-sm text-azure-65">
                                            {endpoint.description ?? "No description"}
                                        </span>
                                    </span>

                                    {isActive ? <CheckIcon /> : null}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex items-center justify-between border-t border-grey-91 px-4 py-3 text-xs text-azure-65">
                        <span>Press K to search</span>
                        <button
                            type="button"
                            onClick={onCreateEndpoint}
                            className="font-medium text-blue-67"
                        >
                            + New Endpoint
                        </button>
                    </div>
                </div>
            </PopoverMenu>

            <PopoverMenu
                open={isScenarioOpen}
                position={scenarioPosition}
                popoverRef={scenarioPopoverRef}
            >
                <div className="overflow-hidden rounded-2xl border border-grey-91 bg-white shadow-[0_20px_40px_rgba(17,24,39,0.14)]">
                    <div className="border-b border-grey-91 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-azure-65">
                        Select Scenario
                    </div>

                    <div className="p-3">
                        {activeEndpoint.scenarios.map((scenario) => {
                            const isActive = scenario.id === activeScenario?.id;

                            return (
                                <button
                                    key={scenario.id}
                                    type="button"
                                    onClick={() => handleScenarioSelect(scenario)}
                                    className={[
                                        "mb-2 flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left",
                                        isActive ? "bg-grey-97" : "hover:bg-grey-98",
                                    ].join(" ")}
                                >
                                    <StatusDot status={scenario.response.status} />
                                    <span className="flex-1">
                                        <span className="block font-semibold text-azure-11">
                                            {scenario.name}
                                        </span>
                                        <span className="block text-sm text-azure-65">
                                            Returns {scenario.response.status}{" "}
                                            {statusLabel(scenario.response.status)}
                                        </span>
                                    </span>

                                    {isActive ? <CheckIcon /> : null}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex items-center justify-between border-t border-grey-91 px-4 py-3 text-xs text-azure-65">
                        <span>Press S to search</span>
                        <button
                            type="button"
                            onClick={() => onCreateScenario?.(activeEndpoint)}
                            className="font-medium text-blue-67"
                        >
                            + New Scenario
                        </button>
                    </div>
                </div>
            </PopoverMenu>
        </>
    );
}

function PopoverMenu({
    open,
    position,
    popoverRef,
    children,
}: {
    open: boolean;
    position: PopoverPosition | null;
    popoverRef: React.RefObject<HTMLDivElement | null>;
    children: React.ReactNode;
}) {
    if (!open || !position || typeof document === "undefined") {
        return null;
    }

    const style =
        position.placement === "bottom"
            ? {
                position: "fixed" as const,
                top: position.top,
                left: position.left,
                width: position.width,
                zIndex: 60,
            }
            : {
                position: "fixed" as const,
                bottom: window.innerHeight - position.top,
                left: position.left,
                width: position.width,
                zIndex: 60,
            };

    return createPortal(
        <div ref={popoverRef} style={style}>
            {children}
        </div>,
        document.body
    );
}

function getPopoverPosition(trigger: HTMLElement): PopoverPosition {
    const rect = trigger.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    const shouldOpenUp = spaceBelow < POPOVER_MIN_HEIGHT && spaceAbove > spaceBelow;

    if (shouldOpenUp) {
        return {
            top: rect.top - POPOVER_OFFSET,
            left: rect.left,
            width: rect.width,
            placement: "top",
        };
    }

    return {
        top: rect.bottom + POPOVER_OFFSET,
        left: rect.left,
        width: rect.width,
        placement: "bottom",
    };
}

function statusLabel(status: number) {
    if (status === 200) return "OK";
    if (status === 404) return "Not Found";
    if (status === 500) return "Internal Error";
    return "";
}

function StatusDot({ status }: { status: number }) {
    const color =
        status >= 200 && status < 300
            ? "bg-green-500"
            : status >= 400 && status < 500
                ? "bg-amber-500"
                : "bg-red-500";

    return <span className={`mt-1 h-3 w-3 rounded-full ${color}`} />;
}

function Chevron({ open }: { open: boolean }) {
    return (
        <svg
            viewBox="0 0 20 20"
            className={`h-5 w-5 text-azure-65 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
        >
            <path d="M5 8l5 5 5-5" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <span className="grid h-6 w-6 place-items-center rounded-full bg-blue-67 text-white">
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                <path d="M7.7 13.3L4.4 10l1.4-1.4 1.9 1.9 6.5-6.5L15.6 5l-7.9 8.3z" />
            </svg>
        </span>
    );
}