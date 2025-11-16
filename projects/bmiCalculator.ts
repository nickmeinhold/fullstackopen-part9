import { parseBmiArguments } from "./utils";

export interface BmiValues {
  value1: number;
  value2: number;
}

export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal range";
  } else if (bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

if (require.main === module) {
  try {
    const args = process.argv.slice(2);
    const { height, weight } = parseBmiArguments(args);
    console.log(calculateBmi(height, weight));
  } catch (e) {
    if (e instanceof Error) {
      console.log("Error:", e.message);
    } else {
      console.log("Unknown error");
    }
  }
}
