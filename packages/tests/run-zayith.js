const path = require("path");
const { spawn } = require("first-base");

const zayith = (...args) =>
  spawn(path.join(__dirname, "../../node_modules/.bin/zayith"), [
    "--seed",
    "1234",
    ...args,
  ]);

module.exports = async function runZayith(...args) {
  const run = zayith(...args);
  await run.completion;
  expect(run.result.error).toBe(false);

  const lines = run.result.stdout.split("\n");
  const indexOfLineWithRunTimeInIt = lines.length - 3;
  lines[indexOfLineWithRunTimeInIt] = lines[indexOfLineWithRunTimeInIt].replace(
    /in [\d.]+ sec/,
    "in X sec"
  );

  const cleanedStdout = lines.join("\n");

  return {
    stdout: cleanedStdout,
    stderr: run.result.stderr,
    code: run.result.code,
    error: run.result.error,
  };
};
