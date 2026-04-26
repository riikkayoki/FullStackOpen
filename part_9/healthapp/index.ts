import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!Number.isFinite(height) || !Number.isFinite(weight)) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  try {
    const bmi = calculateBmi(height, weight);
    res.json({ weight, height, bmi });
  } catch {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

type ParseErrorKind = 'parameters missing' | 'malformatted parameters';

class ExerciseRequestError extends Error {
  constructor(public readonly kind: ParseErrorKind) {
    super(kind);
  }
}

interface ExerciseRequest {
  dailyHours: Array<number>;
  target: number;
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object';

const toFiniteNumber = (value: unknown): number => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw new ExerciseRequestError('malformatted parameters');
  }
  return parsed;
};

const parseExerciseRequest = (body: unknown): ExerciseRequest => {
  if (!isObject(body)) {
    throw new ExerciseRequestError('parameters missing');
  }

  const { daily_exercises, target } = body;

  if (daily_exercises === undefined || target === undefined) {
    throw new ExerciseRequestError('parameters missing');
  }
  if (!Array.isArray(daily_exercises)) {
    throw new ExerciseRequestError('malformatted parameters');
  }

  return {
    dailyHours: daily_exercises.map(toFiniteNumber),
    target: toFiniteNumber(target),
  };
};

app.post('/exercises', (req, res) => {
  try {
    const { dailyHours, target } = parseExerciseRequest(req.body);
    res.json(calculateExercises(dailyHours, target));
  } catch (error: unknown) {
    const kind: ParseErrorKind = error instanceof ExerciseRequestError
      ? error.kind
      : 'malformatted parameters';
    res.status(400).json({ error: kind });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
