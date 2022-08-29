import { basename } from 'path';
import { readdir, writeFile } from 'fs/promises';
import madge from 'madge';

import safeMkdir from './utils/safeMkdir';

async function generateSVG(file: string): Promise<string> {
  const res = await madge(file);
  const buffer = await res.svg();
  return buffer.toString('utf-8');
}

export async function processFolder(dest: string) {
  const files = await readdir(dest);
  const folder = basename(dest);

  await safeMkdir(`dependencies/${folder}`);

  await Promise.all(files.map(async(file) => {
    await writeFile(`dependencies/${folder}/${file}.svg`, await generateSVG(`${dest}/${file}`));
  }));
}
