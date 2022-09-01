import { basename, resolve, relative } from 'path';
import { readdir, writeFile } from 'fs/promises';
import madge from 'madge';

import readConfig from './config';

import safeMkdir from './utils/safeMkdir';
import chunkArray from './utils/chunkArray';

async function generateSVG(file: string): Promise<string> {
  const config = await readConfig();
  const res = config.madge ? await madge(file, config.madge) : await madge(file);
  const buffer = await res.svg();
  return buffer?.toString('utf-8') || '';
}

async function processFile(file: string, dest: string, relativeFolder: string) {
  const svgContent = await generateSVG(`${dest}/${file}`);

  if (!svgContent) {
    console.error(`Could not generate SVG for file: ${file} in folder ${relativeFolder}`);
    return;
  }

  await writeFile(`dependencies/${relativeFolder}/${file}.svg`, svgContent);
  console.log(`"${file}" generated`);
}

export async function processFolder(dest: string) {
  const files = await readdir(dest);
  const relativeFolder = relative(resolve(), dest);

  await safeMkdir(`dependencies/${relativeFolder}`, { recursive: true });

  const fileGroups: string[][] = chunkArray<string>(files, 10);

  for (const fileGroup of fileGroups) {
    await Promise.all(fileGroup.map(async(file) => processFile(file, dest, relativeFolder)));
  }
}
