import { basename } from 'path';
import { readdir, writeFile } from 'fs/promises';
import madge from 'madge';

import safeMkdir from './utils/safeMkdir';

async function generateSVG(file: string): Promise<string> {
  const res = await madge(file);
  const buffer = await res.svg();
  return buffer?.toString('utf-8') || '';
}

export async function processFolder(dest: string) {
  const files = await readdir(dest);
  const folder = basename(dest);

  await safeMkdir(`dependencies/${folder}`);

  for (const file of files) {
    const svgContent = await generateSVG(`${dest}/${file}`);

    if (!svgContent) {
      console.error(`Could not generate SVG for file: ${file} in folder ${folder}`);
      continue;
    }

    await writeFile(`dependencies/${folder}/${file}.svg`, svgContent);
    console.log(`"${file}" generated`);
  }
}
