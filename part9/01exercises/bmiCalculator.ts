interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    //i primi due elementi dell'array sono node e il path relativo
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const floatHeight = height / 100;
  const bmi = weight / (floatHeight * floatHeight);

  let result = "";

  switch (true) {
    case bmi < 16.0:
      result = "Underweight (Severe thinness)";
      break;
    case bmi > 16.0 && bmi <= 16.9:
      result = "Underweight (Moderate thinness)";
      break;
    case bmi >= 17.0 && bmi <= 18.4:
      result = "Underweight (Mild thinness)";
      break;
    case bmi >= 18.5 && bmi <= 24.9:
      result = "Normal range";
      break;
    case bmi >= 25.0 && bmi <= 29.9:
      result = "Overweight (Pre-obese)";
      break;
    case bmi >= 30.0 && bmi <= 34.9:
      result = "Obese (Class I)";
      break;
    case bmi >= 35.0 && bmi <= 39.9:
      result = "Obese (Class II)";
      break;
    case bmi >= 40:
      result = "Obese (Class III)";
      break;
  }

  return result;
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

export default calculateBmi;
