# Target Audience and Use Cases - MockApi 

## Target Audience 

Primary Audience: Development students who have just started learning JavaScript and learning how to work with REST APIs. 

Prerequisites: Basic JavaScript knowledge. No prior knowledge of databases or backend architecture is required. 


## Problem Statement & Purpose 

Setting up a custom backend and database (e.g., MongoDB with Mongoose) is a high barrier for beginners. The purpose of MockApi is to: 

Abstract the database: Allow students to practice API requests without configuring servers or databases.  

Focus on structure: By writing JSON directly, students learn how API responses are structured.  

Simulate reality: Enable students to test how their frontend code behaves when an API returns different HTTP status codes such as 200, 400 or 500.  


## Value Proposition 


Speed: Go from an idea to a working endpoint in minutes. 

Visual Overview: Clearly see the connection between a request and its response. 

Error handling practice: A "Scenario" feature allows students to simulate diffrent response statuses and practice handling errors.  


## Use Case: Creating a Webshop API 

User: Johan (Student) 

Authentication: Johan logs in using his personal account so that his projects and endpoints are saved.  

Project Setup: Johan creates a new project named "Webshop." 

Endpoint Configuration: Johan wants to fetch a list of clothes. He creates a GET endpoint with the path /clothes and pastes his desired JSON structure: 

JSON:

{ 

  "id": 1, 

  "color": "Blue", 

  "brand": "Nike" 

} 

The Call: Johan uses fetch() in his frontend code, targeting the endpoint URL provided by MockApi. The API responds with the exact JSON structure he defined.  

Error Testing: Johan adds a parameter (e.g., ?status=500) to his request to see how his webshop handles server errors. 