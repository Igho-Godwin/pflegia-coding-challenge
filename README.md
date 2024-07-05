# SsweCodingChallenge

## Greetings

> _You've heard of Pflegia, Praxia, Werkia, now get ready for Pizzaria 🍕_

Welcome to the Pizzaria Coding Challenge! In this challenge, you'll work on a base NX project with a Next.js frontend and a NestJS backend. The challenge includes a live coding session (45-1h15 minutes) and some homework (up to 6 working hours).

## Warmup

<details>
<summary>This section is designed to help you get started. Use it as a guide throughout the challenge.</summary>

### Tools

- **Nx**: Monorepo tool that facilitates development by managing Node packages from a single source of truth.
  - Run the whole project: `npm run start`, (assuming you already have `npm` and `nx` installed globally, and have already run `npm install` first)
- **NestJS**: Backend framework for creating standard modules. Supports both REST and GraphQL APIs.
  - REST API: Update `pizza.controller.ts`
  - GraphQL API: Update `pizza.resolver.ts`
- **Next.js**: Frontend framework with built-in routing.
- **Postgres**: The database used in this challenge.
- **TypeORM**: ORM used in this challenge. Use `queryRunner.query('SQL')` if unfamiliar with its API.
- **Apollo/GraphQL**: Used for backend-frontend connection. You can use the `fetch` API if preferred.

### Structure

- **apps**
  - **backend/src**
    - `app` -> Main app module
    - `modules/pizza` -> Pizza module (e.g., `pizza.service.ts`, `pizza.controller.ts`, `pizza.resolver.ts`)
    - `database` -> Database (e.g., migrations, entities)
  - **frontend**
    - `pages/_app.tsx` -> Root
    - `pages/index.tsx` -> Home page
    - `pages/pizzas/[slug].tsx` -> Pizza page
    - `components/*` -> Other components
    - `apollo/*` -> Apollo-related consts (e.g. Queries, Fragments) and return types (e.g. PizzaData)
    - `shared/*` -> Shared resources (e.g., types)
- **libs**
  - `shared` -> Static list of data for emergencies.
  ```ts
  import { STATIC_PIZZAS } from '@pizzaria/shared/pizzas';
  ```

### API

- **GraphQL**
  - Endpoint: `http://localhost:3000/graphql`
  - Resources:
    - Query: `getPizzas` -> Get all pizzas
    - Query: `getPizza` -> Get a single pizza by ID
- **REST API**

  - Endpoint: `http://localhost:3000/api/pizzas`
  - Resources: - `GET /pizza/all` -> Get all pizzas - `GET /pizza/:id` -> Get a single pizza by ID

</details>


### Setup

- Clone the repository.
- Run `npm install` in the root of the project.
- Create a `apps/backend/.env` file with the content similar to `apps/backend/.env.example`.
- Run `npm run start` or `nx serve [frontend|backend]` in the root of the project.
- You can inspect the auto-generated schema in the `apps/backend/schema.gql` when you run the backend.

## Tasks

Your tasks are divided into several arcs. You can solve them in any order and use static data if needed.

### OST:
- Successfully run the application.

### Arc-1: Frontend

1. Adjust the navigation:
   - Link each card to the correct page.
2. Make the header subtitle dynamic:
   - **Required**: Update the header subtitle to contain the pizza name when viewing a recipe.
   - **Optional**: Add a difficulty rating to the header (Easy: 1-4 steps, Mid: 5-8 steps, Hard: 9-12 steps).
3. Design the filter logic:
   - **Required**: Add logic to filter listed pizzas according to input.
   - **Optional**: Sort by most popular pizzas first.

### Arc-2: Backend

1. Uncomment the migrations (`apps/backend/src/database/migrations/index.ts`) and restart the app. Fix the existing seeding migration.
2. Insert 100 pizza recipes into the database.
   - **Discussion Point**: Solution for scaling to 100k pizzas?
3. Query the pizzas and a single pizza recipe.
   - **Discussion Point**: Any improvements possible?

### Arc-3: Full Stack

Note: Tasks can be done with either REST or GraphQL.

1. If using GraphQL, uncomment Apollo client usage, make the query call, and fix any errors.
2. Query the pizzas and a pizza recipe.
3. Any improvements possible?

### Final Arc

1. Make the header sticky.
2. Implement a paginated loader.

### Final Final Arc

1. Add a getter for the pizza's recipe difficulty.
2. Limit displayed ingredients to 3, adding a "+ x more" chip for the rest.

### Post Cinematic New Villain Unveil

1. Add autocomplete for search:
   - Display matches in a dropdown under the input. Clicking a match redirects to the pizza page.
2. Add a highlighted pizza hero banner:
   - Listing query returns best-rated pizzas.
3. Transform ratings into upvotes/downvotes:
   - Update the static ratings to use upvotes and downvotes, displaying them on pizza cards and details.
   - Each user click updates the vote type in the database.
   - **Optional**: Make the voting system robust, preventing users from voting twice on the same pizza.
