import { rm } from 'fs/promises';

export default async function safeRm(folder: string): Promise<boolean> {
  try {
    await rm(folder, {
      recursive: true,
    });
  } catch(err: any) {
    return false;
  }
  return true;
}
