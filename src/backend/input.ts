import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const input = (message: string) => {
  return new Promise<string>((accept, reject) => {
    rl.question(`${message}\n`, accept);
  });
};