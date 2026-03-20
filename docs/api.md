# API Documentation

## Overview

This document describes the currently implemented API endpoints for managing mock endpoints in the project.

Base route:
/api/endpoints

## Authentication

No authentication is currently required.

## Content Type

All requests and responses use JSON.

Content-Type: application/json

## Error format

All error responses return:

{
"message": "Error description"
}

---

## Endpoint model

{
"\_id": "6800aa11bb22cc33dd44ee55",
"name": "Get users",
"projectId": "67f123abc456def789012345",
"method": "GET",
"path": "/users",
"requestBody": null,
"responseBody": {
"users": [
{
"id": 1,
"name": "Alice"
}
]
},
"generateList": true,
"listCount": 10
}

---

## POST /api/endpoints

Creates a new endpoint.

### Request body

{
"name": "Get users",
"projectId": "67f123abc456def789012345",
"method": "GET",
"path": "/users",
"requestBody": null,
"responseBody": {
"users": [
{
"id": 1,
"name": "Alice"
}
]
},
"generateList": true,
"listCount": 10
}

### Success response

Status: 201 Created

{
"\_id": "6800aa11bb22cc33dd44ee55",
"name": "Get users",
"projectId": "67f123abc456def789012345",
"method": "GET",
"path": "/users",
"requestBody": null,
"responseBody": {
"users": [
{
"id": 1,
"name": "Alice"
}
]
},
"generateList": true,
"listCount": 10
}

### Error responses

Status: 400 Bad Request

{
"message": "Invalid request body"
}

Status: 500 Internal Server Error

{
"message": "Internal server error"
}

---

## GET /api/endpoints?projectId={projectId}

Returns all endpoints for a specific project.

### Example request

GET /api/endpoints?projectId=67f123abc456def789012345

### Success response

Status: 200 OK

[
{
"\_id": "6800aa11bb22cc33dd44ee55",
"name": "Get users",
"projectId": "67f123abc456def789012345",
"method": "GET",
"path": "/users",
"requestBody": null,
"responseBody": {
"users": [
{
"id": 1,
"name": "Alice"
}
]
},
"generateList": true,
"listCount": 10
}
]

### Error responses

Status: 400 Bad Request

{
"message": "projectId is required"
}

Status: 500 Internal Server Error

{
"message": "Internal server error"
}

---

## Notes

- Only the currently implemented endpoints are documented
- No authentication is currently used
- Error format is simplified
