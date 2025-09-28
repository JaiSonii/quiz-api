import express from 'express';
import quizRoutes from './routes/quiz.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Main API route
app.use('/api/quizzes', quizRoutes);

// Simple root route
app.get('/', (req, res) => {
  res.send('Quiz API is running! 🚀');
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});