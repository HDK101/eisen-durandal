import { mkdir } from 'fs/promises';
import { MakeDirectoryOptions } from 'fs';

export default async function safeMkdir(folder: string, options?: MakeDirectoryOptions): Promise<boolean> {
  try {
    await mkdir(folder, options);
  } catch(err: any) {
    return false;
  }
  return true;
}
