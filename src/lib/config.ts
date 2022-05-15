import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dev } from '$app/env';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const ROOT_DIR = join(__dirname, dev ? '../../' : '../../../../');
export const CONTENT_DIR = join(ROOT_DIR, import.meta.env.VITE_CONTENT_DIR);
