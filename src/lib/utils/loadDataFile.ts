import { join } from 'node:path';
import { readFile } from 'node:fs/promises';
import YAML from 'yaml';
import { CONTENT_DIR } from '$lib/config';
import { processObject } from '$lib/utils/processObject';

export async function loadDataFile<T>(file: string): Promise<T | null> {
  try {
    const fileName = join(CONTENT_DIR, `data/${file}.yml`);
    const rawData = await readFile(fileName, 'utf8');

    const originalData = YAML.parse(rawData);
    const processedData = await processObject<T>(originalData);

    return processedData;
  } catch (error) {
    console.log(error);
    return null;
  }
}
