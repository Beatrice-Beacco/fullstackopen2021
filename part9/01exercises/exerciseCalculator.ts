interface Valutation {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exerciseHours: Array<number>,
  goalHours: number
): Valutation => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((hours) => hours > 0).length;

  const trainingAverage =
    exerciseHours.reduce((day, total) => total + day, 0) / periodLength;

  const success = trainingAverage >= goalHours;

  let rating;
  let ratingDescription;

  const hourDifference = goalHours - trainingAverage;

  if (hourDifference > 1) {
    rating = 1;
    ratingDescription = "There's much improvement to be done";
  } else if (hourDifference < 1 && hourDifference > 0) {
    rating = 2;
    ratingDescription = "Not too bad but could be better";
  } else {
    rating = 3;
    ratingDescription = "You're working really hard!";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: goalHours,
    average: trainingAverage,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
