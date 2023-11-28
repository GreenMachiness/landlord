# Exercise
Create a REST API for a property management company. The API should allow the landlord to manage their properties and tenants.

# Requirements

## Schemas
The database should have the following tables:

### users:
- id (pk)
- firstName
- lastName
- age
- email
- password
- phoneNumber
- permission (enum['admin', 'owner', 'tenant'])

### properties:

- id (pk)
- address
- city
- state
- zipCode
- rent
- ownerId (fk user_id)
- isVacant

### contracts:
- id (pk)
- propertyId (fk property_id)
- tenantId (fk user_id)
- start
- end
- hasPaid

## Seed Data
Using [https://www.mockaroo.com/](https://www.mockaroo.com/) generate mock data to seed the data with. create at least 15 users (where 2 are admins and 5 are owners), 20 properties, and 8 contracts.

## Endpoints
The API should include the following endpoints:

### Users:
- GET /users - Get a list of all users.
- GET /users/:id - Get the details of a specific user.
- POST /users - Add a new user.
- PUT /users/:id - Update an existing user.
- DELETE /users/:id - Delete an existing user.

### Properties:
- GET /properties - Get a list of all properties.
- GET /properties/:id - Get the details of a specific property.
- POST /properties - Add a new property.
- PUT /properties/:id - Update an existing property.
- DELETE /properties/:id - Delete an existing property.

### contracts:
- GET /contracts - Get a list of all contracts.
- GET /contracts/:id - Get the details of a specific contract.
- POST /contracts - Add a new contract agreement.
- PUT /contracts/:id - Update an existing contract.
- DELETE /contracts/:id - Delete an existing contract.

# Instructions
1. Create a new Express.js project.
2. Create a new database called `landlord_db`
3. Configure Express and knex.
4. Create a new knex migration for each table.
5. Create a seed file and populate it with mock data
6. Configure middleware 
  - parsing the request body
  - console.log() the endpoint and time a request is received
7. Implement the endpoints for users, properties, and contracts

**Note:** 

When implementing the DELETE endpoints, ensure that all foreign key relationshipss are being delete as well.

**Bonus:**

Implement filtering for data using the `query string parameters` for the `GET /Users`, `GET /properties`, and `GET /contracts` endpoints.