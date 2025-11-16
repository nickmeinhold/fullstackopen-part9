export const parseBmiArguments = (args: string[]): { height: number; weight: number } => {
  if (args.length < 2) throw new Error('Not enough arguments. Provide height and weight.');

  const [heightStr, weightStr] = args;
  const height = Number(heightStr);
  const weight = Number(weightStr);

  if (isNaN(height) || isNaN(weight)) throw new Error('Provided values were not numbers!');

  return { height, weight };
};

export const parseExerciseArguments = (
  args: string[]
): { target: number; hours: number[] } => {
  // allow zero or more daily hours after the target
  if (args.length < 1) throw new Error('Not enough arguments. Provide at least the target value.');

  const target = Number(args[0]);
  if (isNaN(target)) throw new Error('Target value is not a number');

  const hours = args.slice(1).map((h) => {
    const n = Number(h);
    if (isNaN(n)) throw new Error('Provided values were not numbers!');
    return n;
  });

  return { target, hours };
};

export default {
  parseBmiArguments,
  parseExerciseArguments,
};
