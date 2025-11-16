type Op = "+" | "-" | "*" | "/" | "add" | "subtract" | "multiply" | "divide";

export const calculator = (
  value1: Number,
  value2: Number,
  op: String
): number => {
  const n1 = Number(value1);
  const n2 = Number(value2);

  if (isNaN(n1) || isNaN(n2) || typeof op !== "string") {
    throw new Error("malformatted parameters");
  }

  const operator = op as Op;

  switch (operator) {
    case "+":
    case "add":
      return n1 + n2;
    case "-":
    case "subtract":
      return n1 - n2;
    case "*":
    case "multiply":
      return n1 * n2;
    case "/":
    case "divide":
      if (n2 === 0) throw new Error("division by zero");
      return n1 / n2;
    default:
      throw new Error("unknown operation");
  }
};

export default calculator;
