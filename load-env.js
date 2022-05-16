import { existsSync } from 'node:fs';
import { config } from 'dotenv';

const { NODE_ENV = 'development' } = process.env;

const envs = [
  { path: '.env', override: false },
  { path: `.env.${NODE_ENV}`, override: false },
  { path: `.env.local`, override: true },
  { path: `.env.${NODE_ENV}.local`, override: true }
];

for (const env of envs) {
  if (existsSync(env.path)) {
    console.log(
      `Loading environment variables from "${env.path}"${
        env.override ? ' (overriding)' : ''
      }`
    );
    config(env);
  }
}
