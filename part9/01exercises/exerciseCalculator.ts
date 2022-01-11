interface ArgumentHours {
  targetHours: number;
  exerciseHours: Array<number>;
}

const parseExerciseArguments = (args: Array<string>): ArgumentHours => {
  if (args.length < 4) throw new Error("Not enough arguments");

  if (checkIfAllArgumentsAreNumbers(args)) {
    const exerciseDaysArray = args
      .slice(3)
      .map((stringElement) => Number(stringElement));

    return {
      targetHours: Number(args[2]),
      exerciseHours: exerciseDaysArray,
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const checkIfAllArgumentsAreNumbers = (args: Array<string>): boolean => {
  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      return false;
    }
  }
  return true;
};
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

try {
  const { targetHours, exerciseHours } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(exerciseHours, targetHours));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

export default calculateExercises;
