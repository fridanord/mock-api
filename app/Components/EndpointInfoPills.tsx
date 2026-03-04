export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface EndpointMethodPillProps {
    method: HttpMethod;
}

const methodBg: Record<HttpMethod, string> = {
    GET: "bg-slate-900",
    POST: "bg-emerald-600",
    PUT: "bg-blue-600",
    PATCH: "bg-amber-500",
    DELETE: "bg-red-600",
};

export function EndpointMethodPill({ method }: EndpointMethodPillProps) {
    return (
        <span
            className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.06em] text-white ${methodBg[method]}`}
        >
            {method}
        </span>
    );
}

interface EndpointCountPillProps {
    label: string;
}

export function EndpointCountPill({ label }: EndpointCountPillProps) {
    return (
        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-normal text-gray-600">
            {label}
        </span>
    );
}