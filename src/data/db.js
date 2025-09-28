// Using Maps for more efficient lookups by ID (O(1) complexity)
export const quizzes = new Map();
export const questions = new Map();

/*
DATA STRUCTURES:

// Quiz Structure
{
  id: 'quiz-uuid-1',
  title: 'Science Quiz',
  questions: [
    'question-uuid-1',
    'question-uuid-2'
  ]
}

// Question Structure
{
  id: 'question-uuid-1',
  quizId: 'quiz-uuid-1',
  text: 'What is the chemical symbol for water?',
  options: [
    { id: 'option-uuid-1', text: 'O2' },
    { id: 'option-uuid-2', text: 'H2O' },
    { id: 'option-uuid-3', text: 'CO2' }
  ],
  correctAnswerId: 'option-uuid-2'
}
*/