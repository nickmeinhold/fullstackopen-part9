import { calculateExercises } from "./exerciseCalculator";

describe("calculateExercises", () => {
  test("example case matches expected output", () => {
    const hours = [3, 0, 2, 4.5, 0, 3, 1];
    const target = 2;
    const result = calculateExercises(hours, target);

    expect(result.periodLength).toBe(7);
    expect(result.trainingDays).toBe(5);
    expect(result.success).toBe(false);
    expect(result.rating).toBe(2);
    expect(result.ratingDescription).toBe("not too bad but could be better");
    expect(result.target).toBe(2);
    expect(result.average).toBeCloseTo(1.9285714285714286);
  });

  test("all days meet target", () => {
    const hours = [2, 2.5, 3, 2, 4];
    const target = 2;
    const result = calculateExercises(hours, target);

    expect(result.periodLength).toBe(5);
    expect(result.trainingDays).toBe(5);
    expect(result.success).toBe(true);
    expect(result.rating).toBe(3);
    expect(result.ratingDescription).toMatch(/great job/i);
  });

  test("no exercise days", () => {
    const hours: number[] = [0, 0, 0, 0];
    const target = 1;
    const result = calculateExercises(hours, target);

    expect(result.periodLength).toBe(4);
    expect(result.trainingDays).toBe(0);
    expect(result.success).toBe(false);
    expect(result.rating).toBe(1);
    expect(result.ratingDescription).toMatch(/need to exercise/i);
    expect(result.average).toBe(0);
  });

  test("partial success (around 75% threshold)", () => {
    const hours = [1.5, 1.5, 1.5, 1.5];
    const target = 2;
    const result = calculateExercises(hours, target);

    // average = 1.5, which is 75% of 2 -> rating 2
    expect(result.rating).toBe(2);
    expect(result.ratingDescription).toBe("not too bad but could be better");
  });
});
