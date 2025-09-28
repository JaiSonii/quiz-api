import * as quizService from '../services/quiz.service.js';

export const createQuiz = (req, res) => {
  try {
    const { title } = req.body;
    const newQuiz = quizService.createQuiz(title);
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addQuestionToQuiz = (req, res) => {
  try {
    const { quizId } = req.params;
    const newQuestion = quizService.addQuestionToQuiz(quizId, req.body);
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllQuizzes = (req, res) => {
  try {
    const allQuizzes = quizService.getAllQuizzes();
    res.status(200).json(allQuizzes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve quizzes.' });
  }
};

export const getQuizQuestions = (req, res) => {
  try {
    const { quizId } = req.params;
    const questions = quizService.getQuestionsForQuiz(quizId);
    res.status(200).json(questions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const submitQuiz = (req, res) => {
  try {
    const { quizId } = req.params;
    const submissions = req.body; // Expects an array of { questionId, selectedOptionId }
    if (!Array.isArray(submissions)) {
        return res.status(400).json({ message: 'Submissions must be an array.' });
    }
    const result = quizService.calculateScore(quizId, submissions);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};