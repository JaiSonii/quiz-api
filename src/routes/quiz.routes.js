import { Router } from 'express';
import * as quizController from '../controllers/quiz.controller.js';

const router = Router();

// --- Quiz Management Routes ---
// GET /api/quizzes - Retrieve a list of all quizzes
router.get('/', quizController.getAllQuizzes);

// POST /api/quizzes - Create a new quiz
router.post('/', quizController.createQuiz);

// POST /api/quizzes/:quizId/questions - Add a question to a specific quiz
router.post('/:quizId/questions', quizController.addQuestionToQuiz);


// --- Quiz Taking Routes ---
// GET /api/quizzes/:quizId/questions - Fetch all questions for a quiz
router.get('/:quizId/questions', quizController.getQuizQuestions);

// POST /api/quizzes/:quizId/submit - Submit answers and get a score
router.post('/:quizId/submit', quizController.submitQuiz);


export default router;