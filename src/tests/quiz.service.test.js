import { questions } from '../data/db.js';
import { calculateScore } from '../services/quiz.service.js';
import { jest } from '@jest/globals'; // explicit import for ESM

// Mock quiz data for testing
const mockQuiz = { id: 'quiz-1', questions: ['q1', 'q2'] };
const mockQuestions = [
  { id: 'q1', quizId: 'quiz-1', correctAnswerId: 'opt-1-2' },
  { id: 'q2', quizId: 'quiz-1', correctAnswerId: 'opt-2-1' },
];

describe('Quiz Service - calculateScore', () => {
  let db;

  // Before all tests, import the db module dynamically
  beforeAll(async () => {
    db = await import('../data/db.js');
  });

  // Before each test, reset mocks and populate data
  beforeEach(() => {
    questions.clear();
    mockQuestions.forEach(q => questions.set(q.id, q));

    // Spy on the quizzes map's get method
    jest.spyOn(db.quizzes, 'get').mockReturnValue(mockQuiz);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should return a perfect score for all correct answers', () => {
    const submissions = [
      { questionId: 'q1', selectedOptionId: 'opt-1-2' },
      { questionId: 'q2', selectedOptionId: 'opt-2-1' },
    ];
    const result = calculateScore('quiz-1', submissions);
    expect(result).toEqual({ score: 2, total: 2 });
  });

  test('should return a score of zero for all incorrect answers', () => {
    const submissions = [
      { questionId: 'q1', selectedOptionId: 'wrong-opt' },
      { questionId: 'q2', selectedOptionId: 'wrong-opt' },
    ];
    const result = calculateScore('quiz-1', submissions);
    expect(result).toEqual({ score: 0, total: 2 });
  });

  test('should return a partial score for mixed answers', () => {
    const submissions = [
      { questionId: 'q1', selectedOptionId: 'opt-1-2' }, // Correct
      { questionId: 'q2', selectedOptionId: 'wrong-opt' }, // Incorrect
    ];
    const result = calculateScore('quiz-1', submissions);
    expect(result).toEqual({ score: 1, total: 2 });
  });

  test('should ignore submissions for questions not in the quiz', () => {
    const submissions = [
      { questionId: 'q1', selectedOptionId: 'opt-1-2' },
      { questionId: 'q-extra', selectedOptionId: 'any-opt' }, // Extra submission
    ];
    const result = calculateScore('quiz-1', submissions);
    expect(result).toEqual({ score: 1, total: 2 });
  });

  test('should return a score of zero for an empty submission array', () => {
    const submissions = [];
    const result = calculateScore('quiz-1', submissions);
    expect(result).toEqual({ score: 0, total: 2 });
  });
});
