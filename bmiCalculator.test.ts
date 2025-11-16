import { calculateBmi } from "./bmiCalculator";

test("calculateBmi for 180 cm and 74 kg returns Normal (healthy weight)", () => {
  expect(calculateBmi(180, 74)).toBe("Normal range)");
});

test("calculateBmi identifies Underweight", () => {
  expect(calculateBmi(180, 55)).toBe("Underweight");
});

test("calculateBmi identifies Overweight", () => {
  expect(calculateBmi(180, 85)).toBe("Overweight");
});

test("calculateBmi identifies Obese", () => {
  expect(calculateBmi(160, 90)).toBe("Obese");
});
