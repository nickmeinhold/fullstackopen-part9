interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyHours: number[],
  target: number
): ExerciseResult => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((h) => h > 0).length;

  if (periodLength === 0) {
    // No data: return a sensible default without dividing by zero
    const average = 0;
    const success = false;
    const rating = 1;
    const ratingDescription = 'you need to exercise more';

    return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average,
    };
  }

  const sum = dailyHours.reduce((acc, cur) => acc + cur, 0);
  const average = sum / periodLength;
  const success = average >= target;

  // rating: 3 = excellent (>= target), 2 = okay (>= 75% of target), 1 = poor
  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "great job, target met";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "you need to exercise more";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

import { parseExerciseArguments } from "./utils";

if (require.main === module) {
  try {
    const args = process.argv.slice(2);
    const { target, hours } = parseExerciseArguments(args);
    console.log(calculateExercises(hours, target));
  } catch (e) {
    if (e instanceof Error) {
      console.log("Error:", e.message);
    } else {
      console.log("Unknown error");
    }
  }
}

export { calculateExercises, ExerciseResult };
