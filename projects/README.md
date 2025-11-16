# Part 9 — Fullstackopen exercises

This repository contains small TypeScript exercise programs for the Fullstackopen course (part 9).

Prerequisites

- Node.js (16+ recommended)
- npm (bundled with Node)

Install dependencies

```bash
npm install
```

Available npm scripts

- `npm run calculateBmi`

  Runs the BMI exercise (`bmiCalculator.ts`). You can pass height and weight as command-line arguments.

  Usage examples:

  ```bash
  # Pass height (cm) and weight (kg):
  npm run calculateBmi -- 180 91
  # Output: e.g. "Overweight"
  ```

- `npm run calculateExercises`

  Runs the exercise calculator (`exerciseCalculator.ts`). Pass the target as the first argument, followed by any number of daily exercise hours.

  Usage examples:

  ```bash
  # Using the script with the sample input from the exercise prompt:
  npm run calculateExercises -- 2 1 0 2 4.5 0 3 1 0 4

  # Example output:
  # {
  #   periodLength: 9,
  #   trainingDays: 6,
  #   success: false,
  #   rating: 2,
  #   ratingDescription: 'not too bad but could be better',
  #   target: 2,
  #   average: 1.7222222222222223
  # }
  ```

- `npm test`

  Runs the test suite (Jest + ts-jest).

  Example:

  ```bash
  npm test -- --colors --runInBand
  ```

- `npm run build`

  Compiles TypeScript to JavaScript into the `build/` directory using `tsc`.

  Example:

  ```bash
  npm run build
  node build/index.js
  ```

Notes

- The project uses `ts-node` for running TypeScript files directly during development. If you prefer a build step for production, use `npm run build` and run the emitted files under `build/`.

- Tests are configured with `ts-jest`. If you add ESM-style imports or change `tsconfig.json` to NodeNext, the Jest config may need adjustments.

Error handling and CLI notes

- Both calculators validate command-line input and will print an error message when arguments are missing or not numeric. Pass arguments after `--` when using the `npm run` form, for example:

```bash
npm run calculateBmi -- <height(cm)> <weight(kg)>
npm run calculateExercises -- <target> <day1> <day2> ...
```

Replace `<height(cm)>`, `<weight(kg)>`, `<target>`, and `<dayN>` with numeric values. The `exerciseCalculator` accepts any length for daily hours (including zero-length arrays). If you pass only a target value (no daily hours), the program will return a result with `periodLength: 0` and sensible defaults (average 0, `success: false`).
