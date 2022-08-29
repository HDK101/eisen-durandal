import { access, mkdir } from 'fs/promises';

export default async function safeMkdir(folder: string): Promise<boolean> {
  try {
    await mkdir(folder);
  } catch(err: any) {
    return false;
  }
  return true;
}
