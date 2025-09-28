# Quiz API Backend

A simple yet robust backend API for a quiz application, built with Node.js and Express. This project allows for quiz creation, question management, and a complete quiz-taking and scoring workflow.

---

## ✨ Core Features

* **Quiz Management**: Create quizzes and add questions with multiple options.
* **Quiz Taking**: Fetch questions for a specific quiz (without revealing the answers).
* **Scoring**: Submit answers and receive an instant score.
* **RESTful Design**: Logical and predictable API endpoints.
* **Separation of Concerns**: Code is organized into routes, controllers, and services for maintainability.

## 🚀 Tech Stack

* **Runtime**: Node.js
* **Framework**: Express.js
* **Unique IDs**: `uuid`
* **Development**: `nodemon` for live server reloading
* **Testing**: `jest` for unit testing

---

## 🛠️ Setup and Run Locally

**1. Clone the repository:**
```bash
git clone <your-repository-url>
cd quiz-api
```

**2. Install dependencies:**
```bash
npm install
```

**3. Run the development server:**
The server will start on `http://localhost:3000` and automatically restart when you make changes.
```bash
npm run dev
```

---

🧪 Running Tests

To run the unit tests for the core business logic (e.g., the scoring function), use the following command:
```bash
npm test
```

---

### ## 📡 API Endpoints

| Method | Endpoint                             | Description                                 | Request Body Example                                                                               |
| :----- | :----------------------------------- | :------------------------------------------ | :------------------------------------------------------------------------------------------------- |
| `POST` | `/api/quizzes`                       | Create a new quiz.                          | `{ "title": "World Capitals" }`                                                                    |
| `GET`  | `/api/quizzes`                       | Get a list of all available quizzes.        | `N/A`                                                                                              |
| `POST` | `/api/quizzes/:quizId/questions`     | Add a question to a specific quiz.          | `{ "text": "Capital of Japan?", "options": ["Beijing", "Seoul", "Tokyo"], "correctAnswerIndex": 2 }` |
| `GET`  | `/api/quizzes/:quizId/questions`     | Fetch all questions for a quiz to take.     | `N/A`                                                                                              |
| `POST` | `/api/quizzes/:quizId/submit`        | Submit answers and get a score.             | `[{ "questionId": "...", "selectedOptionId": "..." }]`                                             |

---

🧠 Design Choices & Assumptions

* **In-Memory Database**: For simplicity and to avoid requiring a database setup, the application uses an in-memory data store (`Map` objects). This means all data will be reset when the server restarts.
* **UUIDs**: All quizzes, questions, and options are assigned unique IDs using the `uuid` library to ensure there are no collisions.
* **Stateless API**: The API is stateless. No session or user data is stored on the server between requests.
* **Error Handling**: Basic error handling is implemented. The API returns appropriate `4xx` status codes for client errors (e.g., not found, bad request) and `5xx` for server errors.
* **Validation**: Validation is handled within the service layer to ensure data integrity (e.g., a question must have a valid correct answer index).