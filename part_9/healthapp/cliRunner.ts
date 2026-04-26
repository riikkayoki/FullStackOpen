export const parseNumberArgs = (args: Array<string>): Array<number> => {
  const numbers = args.map(Number);
  if (numbers.some((value) => !Number.isFinite(value))) {
    throw new Error('All arguments must be valid numbers');
  }
  return numbers;
};

export const runCli = (action: () => void): void => {
  try {
    action();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Error: ${message}`);
    process.exit(1);
  }
};
