import type { EndpointSummary } from "@/app/Components/Mocktypes/mocktypes";

export const mockEndpoints: EndpointSummary[] = [
    {
        id: "endpoint-users-show",
        projectId: "project-mockapi",
        method: "GET",
        path: "/users/:id",
        description: "Fetch detailed user profile information",
        enabled: true,
        scenarios: [
            {
                id: "scenario-users-success",
                endpointId: "endpoint-users-show",
                name: "Success Case",
                response: {
                    id: "response-users-success",
                    scenarioId: "scenario-users-success",
                    status: 200,
                    bodyTemplate: {
                        data: {
                            id: "550e8400-e29b",
                            name: "John Doe",
                            email: "john@mock.io",
                            role: "admin",
                            createdAt: "2023-10-25",
                            status: "active",
                        },
                        meta: {
                            traceId: "abc-123",
                            latency: "45ms",
                        },
                    },
                },
            },
            {
                id: "scenario-users-error",
                endpointId: "endpoint-users-show",
                name: "Error Case",
                response: {
                    id: "response-users-error",
                    scenarioId: "scenario-users-error",
                    status: 500,
                    bodyTemplate: {
                        error: {
                            code: "INTERNAL_ERROR",
                            message: "Something went wrong while fetching the user.",
                        },
                    },
                },
            },
            {
                id: "scenario-users-not-found",
                endpointId: "endpoint-users-show",
                name: "Not Found",
                response: {
                    id: "response-users-not-found",
                    scenarioId: "scenario-users-not-found",
                    status: 404,
                    bodyTemplate: {
                        error: {
                            code: "USER_NOT_FOUND",
                            message: "No user exists for the provided id.",
                        },
                    },
                },
            },
        ],
    },
    {
        id: "endpoint-company-employees",
        projectId: "project-mockapi",
        method: "POST",
        path: "/company/employees",
        description: "Create a new employee record",
        enabled: true,
        scenarios: [
            {
                id: "scenario-employees-created",
                endpointId: "endpoint-company-employees",
                name: "Created",
                response: {
                    id: "response-employees-created",
                    scenarioId: "scenario-employees-created",
                    status: 200,
                    bodyTemplate: {
                        data: {
                            id: "emp-001",
                            name: "Anna Andersson",
                            department: "Engineering",
                        },
                    },
                },
            },
            {
                id: "scenario-employees-invalid",
                endpointId: "endpoint-company-employees",
                name: "Validation Error",
                response: {
                    id: "response-employees-invalid",
                    scenarioId: "scenario-employees-invalid",
                    status: 500,
                    bodyTemplate: {
                        error: {
                            code: "VALIDATION_FAILED",
                            message: "Missing required employee fields.",
                        },
                    },
                },
            },
        ],
    },
    {
        id: "endpoint-products-list",
        projectId: "project-mockapi",
        method: "GET",
        path: "/products",
        description: "List all available products",
        enabled: true,
        scenarios: [
            {
                id: "scenario-products-default",
                endpointId: "endpoint-products-list",
                name: "Default List",
                response: {
                    id: "response-products-default",
                    scenarioId: "scenario-products-default",
                    status: 200,
                    bodyTemplate: {
                        data: [
                            { id: "prod-1", name: "Keyboard", price: 99 },
                            { id: "prod-2", name: "Mouse", price: 49 },
                        ],
                    },
                },
            },
        ],
    },
];