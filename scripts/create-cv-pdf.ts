import '../load-env.js';
import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import http from 'node:http';
import rimraf from 'rimraf';
import YAML from 'yaml';
import puppeteer from 'puppeteer';
import handler from 'serve-handler';
import { createHttpTerminator } from 'http-terminator';

const { VITE_CONTENT_DIR = '.' } = process.env;

const CV_DATA_FILE = resolve(join(VITE_CONTENT_DIR, 'data/cv.yml'));
const BASE_PATH = resolve('./build');

const PORT = 3010;

async function main() {
  console.log('[scripts/create-cv-pdf] Creating CV PDF file ...');

  const cvDataRaw = await readFile(CV_DATA_FILE, 'utf8');
  const cvData = YAML.parse(cvDataRaw);
  const cvOutputFile = join(BASE_PATH, cvData.meta.fileName);

  const server = http.createServer((request, response) =>
    handler(request, response, { public: BASE_PATH })
  );

  const httpTerminator = createHttpTerminator({
    server
  });

  server.listen(PORT);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`http://localhost:${PORT}/cv/print`, {
    waitUntil: 'networkidle2'
  });

  await page.pdf({
    path: cvOutputFile,
    format: 'a4',
    scale: 0.745,
    margin: {
      top: '30mm',
      bottom: '30mm',
      left: '25mm',
      right: '25mm'
    }
  });

  await browser.close();

  await httpTerminator.terminate();

  rimraf(join(BASE_PATH, 'cv'), (err) => {
    if (err) throw err;
  });

  console.log(`[scripts/create-cv-pdf] Successfully created ${cvOutputFile}`);
}

main().catch(console.error);
