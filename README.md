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

  Runs the BMI exercise (`bmiCalculator.ts`) which prints the BMI category for hard-coded values.

  Example:

  ```bash
  npm run calculateBmi
  # Expected output: e.g. "Normal range"
  ```

- `npm run calculateExercises`

  Runs the exercise calculator (`exerciseCalculator.ts`) which prints an object summarizing exercise statistics for a hard-coded input.

  Example:

  ```bash
  npm run calculateExercises
  # Expected output: summary object with periodLength, trainingDays, average, rating, etc.
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
  node build/index.js   # if you have a compiled CLI at build/index.js
  ```

Notes

- The project uses `ts-node` for running TypeScript files directly during development. If you prefer a build step for production, use `npm run build` and run the emitted files under `build/`.

- Tests are configured with `ts-jest`. If you add ESM-style imports or change `tsconfig.json` to NodeNext, the Jest config may need adjustments.
