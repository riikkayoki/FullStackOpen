import { parseNumberArgs, runCli } from './cliRunner';

type Rating = 1 | 2 | 3;

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
  target: number;
  average: number;
}

const RatingDescription: Record<Rating, string> = {
  1: 'you should train more',
  2: 'not too bad but could be better',
  3: 'great job, you met the target',
};

const countTrainingDays = (dailyHours: Array<number>): number =>
  dailyHours.filter((hours) => hours > 0).length;

const computeAverage = (dailyHours: Array<number>): number =>
  dailyHours.reduce((sum, hours) => sum + hours, 0) / dailyHours.length;

const computeRating = (average: number, target: number): Rating => {
  if (average >= target) return 3;
  if (average >= target * 0.75) return 2;
  return 1;
};

export const calculateExercises = (dailyHours: Array<number>, target: number): ExerciseResult => {
  if (dailyHours.length === 0) {
    throw new Error('dailyHours must contain at least one day');
  }
  if (!Number.isFinite(target) || target <= 0) {
    throw new Error('target must be a positive, finite number');
  }
  if (dailyHours.some((hours) => !Number.isFinite(hours) || hours < 0)) {
    throw new Error('dailyHours must contain non-negative, finite numbers');
  }

  const periodLength = dailyHours.length;
  const trainingDays = countTrainingDays(dailyHours);
  const average = computeAverage(dailyHours);
  const rating = computeRating(average, target);

  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription: RatingDescription[rating],
    target,
    average,
  };
};

interface ExerciseArguments {
  target: number;
  dailyHours: Array<number>;
}

const parseExerciseArguments = (args: Array<string>): ExerciseArguments => {
  if (args.length < 2) {
    throw new Error('Usage: npm run calculateExercises <target> <hours...>');
  }
  const [target, ...dailyHours] = parseNumberArgs(args);
  return { target, dailyHours };
};

if (require.main === module) {
  runCli(() => {
    const { target, dailyHours } = parseExerciseArguments(process.argv.slice(2));
    console.log(calculateExercises(dailyHours, target));
  });
}
