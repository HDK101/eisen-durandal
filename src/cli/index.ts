import { processFolder } from '../generator';
import safeMkdir from '../utils/safeMkdir';
import safeRm from '../utils/safeRm';

import readConfig from '../config';

async function start() {
  await safeRm('dependencies');
  
  await safeMkdir('dependencies');

  const config = await readConfig();

  if (!config?.paths) {
    console.error('Config field "paths" is empty.');
    return;
  }

  const { paths } = config;

  for (const path of paths) {
    await processFolder(path);
  }

  console.log('Graphs generated.');
}

start();
