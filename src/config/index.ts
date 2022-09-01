import { MadgeConfig } from 'madge';
import { readFile } from "fs/promises";

interface ConfigFile {
  paths: string[];
  madge?: MadgeConfig;
}

export default async function read(): Promise<ConfigFile> {
  const file: ConfigFile = JSON.parse(await readFile('.durandal.json', { encoding: 'utf8'}));
  return file;
}
