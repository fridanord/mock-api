"use client";
import {
    EndpointMethodPill,
    EndpointCountPill,
    HttpMethod,
} from "./EndpointInfoPills";
import {
    EndpointEditButton,
    EndpointTestButton,
    EndpointDeleteButtonSm,
} from "./EndpointsButtons";

export type FakeEndpoint = {
    id: string;
    method: HttpMethod;
    path: string;
    countLabel?: string;
};

interface EndpointListContainerProps {
    endpoints?: FakeEndpoint[];
    onEdit?: (endpoint: FakeEndpoint) => void;
    onTest?: (endpoint: FakeEndpoint) => void;
    onDelete?: (endpoint: FakeEndpoint) => void;
}

const fallbackEndpoints: FakeEndpoint[] = [
    { id: "1", method: "GET", path: "/users", countLabel: "lista ×5" },
    { id: "2", method: "POST", path: "/users" },
    { id: "3", method: "GET", path: "/products", countLabel: "lista ×10" },
    { id: "4", method: "GET", path: "/products/:id" },
];

export default function EndpointListContainer({
    endpoints = fallbackEndpoints,
    onEdit,
    onTest,
    onDelete,
}: EndpointListContainerProps) {
    return (
        <section className="max-w-3xl">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                    Endpoints
                </h2>

                <ul className="divide-y divide-gray-100">
                    {endpoints.map((endpoint) => (
                        <EndpointListItem
                            key={endpoint.id}
                            endpoint={endpoint}
                            onEdit={onEdit}
                            onTest={onTest}
                            onDelete={onDelete}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
}

function EndpointListItem({
    endpoint,
    onEdit,
    onTest,
    onDelete,
}: {
    endpoint: FakeEndpoint;
    onEdit?: (endpoint: FakeEndpoint) => void;
    onTest?: (endpoint: FakeEndpoint) => void;
    onDelete?: (endpoint: FakeEndpoint) => void;
}) {
    return (
        <li className="flex items-center justify-between py-4">
            <div className="flex flex-wrap items-center gap-4">
                <EndpointMethodPill method={endpoint.method} />
                <span className="text-base font-medium text-gray-800">
                    {endpoint.path}
                </span>
                {endpoint.countLabel && (
                    <EndpointCountPill label={endpoint.countLabel} />
                )}
            </div>

            <div className="flex items-center gap-2">
                <EndpointEditButton onClick={() => onEdit?.(endpoint)} />
                <EndpointTestButton onClick={() => onTest?.(endpoint)} />
                <EndpointDeleteButtonSm
                    onClick={() => onDelete?.(endpoint)}
                />
            </div>
        </li>
    );
}