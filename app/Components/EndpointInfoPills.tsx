export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface EndpointMethodPillProps {
    method: HttpMethod;
}

const methodBadgeClass: Record<HttpMethod, string> = {
    GET: "badge-get",
    POST: "badge-post",
    PUT: "badge-put",
    PATCH: "badge-patch",
    DELETE: "badge-delete",
};

export function EndpointMethodPill({ method }: EndpointMethodPillProps) {
    return <span className={`method-badge ${methodBadgeClass[method]}`}>{method}</span>;
}

interface EndpointCountPillProps {
    label: string;
}

export function EndpointCountPill({ label }: EndpointCountPillProps) {
    return <span className="list-badge">{label}</span>;
}