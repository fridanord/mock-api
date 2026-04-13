export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ResponseSummary = {
    id: string;
    scenarioId: string;
    status: number;
    bodyTemplate: unknown;
    inferredTypes?: Record<string, string>;
    createdAt?: string;
};

export type ScenarioSummary = {
    id: string;
    endpointId: string;
    name: string;
    trigger?: Record<string, unknown>;
    createdAt?: string;
    response: ResponseSummary;
};

export type EndpointSummary = {
    id: string;
    projectId: string;
    method: HttpMethod;
    path: string;
    description?: string;
    enabled?: boolean;
    createdAt?: string;
    updatedAt?: string;
    scenarios: ScenarioSummary[];
};