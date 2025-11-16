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

// Hard-coded example
const hours = [3, 0, 2, 4.5, 0, 3, 1];
const target = 2;
console.log(calculateExercises(hours, target));

export { calculateExercises, ExerciseResult };
