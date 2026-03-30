# Project Proposal

**Name:** Sumanpreet Singh
**Student ID:** 0418819

---

## 1. Project Concept

The project is a Movies and Series API. Users can manage a catalog of movies and TV series adding titles, updating info, writing reviews, and tracking what they want to watch.

I went with this idea because it fits naturally with what we covered in class. There are multiple resources with clear relationships between them, the data is easy to reason about, and the endpoints make sense without overcomplicating things. It has enough going on to cover all the project requirements — CRUD, validation, authentication, documentation — but stays manageable.

The API is built with Node.js, Express.js, and TypeScript. Firebase handles both the database and authentication.

---

## 2. Scope and Functionality

The API covers three main resources beyond the Users resource required for authentication:

### Movies

Each movie stores a title, genre, release year, description, and rating.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /movies | Get all movies |
| GET | /movies/:id | Get a single movie |
| POST | /movies | Add a new movie |
| PUT | /movies/:id | Update a movie |
| DELETE | /movies/:id | Delete a movie |

**Input example (POST /movies):**
```json
{
  "title": "Inception",
  "genre": "Sci-Fi",
  "releaseYear": 2010,
  "description": "A thief who steals corporate secrets through dream-sharing technology.",
  "rating": 8.8
}
```

**Output example:**
```json
{
  "id": "abc123",
  "title": "Inception",
  "genre": "Sci-Fi",
  "releaseYear": 2010,
  "description": "A thief who steals corporate secrets through dream-sharing technology.",
  "rating": 8.8
}
```

---

### Series

Each series stores a title, genre, number of seasons, status (ongoing or ended), and description.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /series | Get all series |
| GET | /series/:id | Get a single series |
| POST | /series | Add a new series |
| PUT | /series/:id | Update a series |
| DELETE | /series/:id | Delete a series |

**Input example (POST /series):**
```json
{
  "title": "Breaking Bad",
  "genre": "Drama",
  "seasons": 5,
  "status": "ended",
  "description": "A chemistry teacher turned drug manufacturer."
}
```

**Output example:**
```json
{
  "id": "xyz789",
  "title": "Breaking Bad",
  "genre": "Drama",
  "seasons": 5,
  "status": "ended",
  "description": "A chemistry teacher turned drug manufacturer."
}
```

---

### Reviews

Each review is tied to either a movie or a series, with a rating out of 10 and a written comment.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /reviews | Get all reviews |
| GET | /reviews/:id | Get a single review |
| POST | /reviews | Add a new review |
| PUT | /reviews/:id | Update a review |
| DELETE | /reviews/:id | Delete a review |

**Input example (POST /reviews):**
```json
{
  "targetId": "abc123",
  "targetType": "movie",
  "rating": 9,
  "comment": "One of the best sci-fi films ever made."
}
```

**Output example:**
```json
{
  "id": "rev456",
  "targetId": "abc123",
  "targetType": "movie",
  "rating": 9,
  "comment": "One of the best sci-fi films ever made.",
  "createdAt": "2025-03-29T10:00:00Z"
}
```

All data lives in Firebase Firestore. Every endpoint has input validation and error handling.

---

## 3. Course Content Alignment

Everything here maps directly to course content. Nothing falls outside the scope.

- **Module 1 — Backend Introduction:** Node.js, Express.js, and TypeScript following the project structure from class. TSDoc comments on functions, ESLint for code quality, GitHub Actions for linting on every push.

- **Module 2 — Core Concepts:** Full CRUD on all three resources using the right HTTP methods and status codes. RESTful design throughout.

- **Module 3 — Validation and Databases:** Firebase Firestore as the database. Input validation and error handling on every endpoint.

- **Module 4 — Authentication and Authorization:** Firebase Authentication for user management. Role-based access using Firebase custom claims, with endpoints protected based on user roles.

- **Module 5 — Documentation and Security:** Swagger/OpenAPI docs with inline JSDoc comments on all routes. GitHub Actions handles linting automatically.

---

## 4. GitHub Setup

- **main** — final code only, nothing gets pushed here until it is done
- **development** — created at the start, ongoing work lives here
- **Feature branches** — one per issue, work gets done here, then a PR is opened to merge into `development`

Each feature branch gets merged into `development` via a pull request. The closed PR is what gets submitted per milestone.

GitHub Issues are used for task tracking — at least 5 issues, one per milestone, each with a clear name and description. No project board.