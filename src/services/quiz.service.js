import { v4 as uuidv4 } from 'uuid';
import { quizzes, questions } from '../data/db.js';

export const createQuiz = (title) => {
  if (!title || typeof title !== 'string') {
    throw new Error('Title is required and must be a string.');
  }
  const newQuiz = {
    id: uuidv4(),
    title,
    questions: [],
  };
  quizzes.set(newQuiz.id, newQuiz);
  return newQuiz;
};

export const addQuestionToQuiz = (quizId, questionData) => {
  const quiz = quizzes.get(quizId);
  if (!quiz) {
    throw new Error('Quiz not found.');
  }
  const { text, options, correctAnswerIndex } = questionData;

  // Basic validation (Bonus Feature)
  if (!text || !Array.isArray(options) || options.length < 2 || correctAnswerIndex === undefined) {
    throw new Error('Invalid question data. A question needs text, at least 2 options, and a correct answer index.');
  }
  if (correctAnswerIndex < 0 || correctAnswerIndex >= options.length) {
     throw new Error('Correct answer index is out of bounds.');
  }

  const newQuestion = {
    id: uuidv4(),
    quizId,
    text,
    options: options.map(opt => ({ id: uuidv4(), text: opt })),
  };
  newQuestion.correctAnswerId = newQuestion.options[correctAnswerIndex].id;

  questions.set(newQuestion.id, newQuestion);
  quiz.questions.push(newQuestion.id);

  return newQuestion;
};

export const getAllQuizzes = () => {
  // Return a simplified list of quizzes
  return Array.from(quizzes.values()).map(({ id, title }) => ({ id, title }));
};

export const getQuestionsForQuiz = (quizId) => {
  const quiz = quizzes.get(quizId);
  if (!quiz) {
    throw new Error('Quiz not found.');
  }
  // Retrieve full question objects and strip out the correct answer
  return quiz.questions.map(qId => {
    const question = questions.get(qId);
    const { correctAnswerId, ...questionForUser } = question;
    return questionForUser;
  });
};

export const calculateScore = (quizId, submissions) => {
  const quiz = quizzes.get(quizId);
  if (!quiz) {
    throw new Error('Quiz not found.');
  }
  let score = 0;
  submissions.forEach(submission => {
    const question = questions.get(submission.questionId);
    if (question && question.quizId === quizId && question.correctAnswerId === submission.selectedOptionId) {
      score++;
    }
  });

  return { score, total: quiz.questions.length };
};