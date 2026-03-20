# API Documentation

## Overview

This document describes the currently implemented API endpoints for managing mock endpoints in the project.

Base route: `/api/endpoints`

## Authentication

No authentication is currently required.

## Content Type

All requests and responses use JSON.

`Content-Type: application/json`

## Error Format

All error responses return the following structure:

{
"message": "Error description"
}

---

## Endpoint Model

{
"\_id": "6800aa11bb22cc33dd44ee55",
"name": "Get users",
"projectId": "67f123abc456def789012345",
"method": "GET",
"path": "/users",
"requestBody": null,
"responseBody": [
{
"id": 1,
"name": "Alice"
}
],
"generateList": true,
"listCount": 1
}

### Field Description

- `_id` — MongoDB-generated identifier for the endpoint
- `name` — human-readable endpoint name
- `projectId` — reference to the related project
- `method` — HTTP method
- `path` — endpoint path
- `requestBody` — request payload definition, currently nullable
- `responseBody` — mock response body
- `generateList` — indicates whether the response is treated as a list
- `listCount` — number of items if the response is a list

### Supported HTTP Methods

- `GET`
- `POST`
- `PUT`
- `PATCH`
- `DELETE`

---

## POST /api/endpoints

Creates a new endpoint.

### Request Body

{
"name": "Get users",
"projectId": "67f123abc456def789012345",
"method": "GET",
"path": "/users",
"requestBody": null,
"responseBody": [
{
"id": 1,
"name": "Alice"
}
],
"generateList": true,
"listCount": 1
}

### Success Response

**Status:** `201 Created`

{
"\_id": "6800aa11bb22cc33dd44ee55",
"name": "Get users",
"projectId": "67f123abc456def789012345",
"method": "GET",
"path": "/users",
"requestBody": null,
"responseBody": [
{
"id": 1,
"name": "Alice"
}
],
"generateList": true,
"listCount": 1
}

### Error Responses

**Status:** `400 Bad Request`

{
"message": "name, projectId, method, path och responseBody krävs."
}

**Status:** `500 Internal Server Error`

{
"message": "Kunde inte skapa endpoint."
}

---

## GET /api/endpoints?projectId={projectId}

Returns all endpoints for a specific project.

### Example Request

GET /api/endpoints?projectId=67f123abc456def789012345

### Success Response

**Status:** `200 OK`

[
{
"\_id": "6800aa11bb22cc33dd44ee55",
"name": "Get users",
"projectId": "67f123abc456def789012345",
"method": "GET",
"path": "/users",
"requestBody": null,
"responseBody": [
{
"id": 1,
"name": "Alice"
}
],
"generateList": true,
"listCount": 1
}
]

### Error Responses

**Status:** `400 Bad Request`

{
"message": "projectId krävs för att hämta endpoints."
}

**Status:** `500 Internal Server Error`

{
"message": "Kunde inte hämta endpoints."
}

---

## Notes

- Only the currently implemented endpoints are documented.
- No authentication is currently used.
- The API currently supports create and fetch operations for endpoints.
- Frontend and backend are currently connected through `/api/endpoints`.
- Dynamic authentication and project selection may be added later.
