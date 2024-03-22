const { resolve } = require('path');
const { readdir } = require('fs').promises;
const { cpSync, rmSync } = require('fs');

async function getDirs(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  let dirs = [];
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      dirs.push(dirent.path + dirent.name);
    }
  }
  return dirs;
}

(async () => {
  let src, dest;

  console.log(`[copyGeneratedStrapiTypes.js] Copying content-types...`);
  let dirs = await getDirs('../backend/src/api/');
  for (const dir of dirs) {
    const src = `${dir}/content-types`;
    const dest = `./src/types/api/${dir.split('/').slice(-1)[0]}/content-types`;
    try {
      cpSync(src, dest, { recursive: true });
    } catch {
      console.log(`[copyGeneratedStrapiTypes.js] ${src} > ${dest} failed`);
    }
  }

  console.log(`[copyGeneratedStrapiTypes.js] Copying components...`);
  src = '../backend/src/components/';
  dest = `./src/types/components/`;
  try {
    cpSync(src, dest, { recursive: true });
  } catch {
    console.log(`[copyGeneratedStrapiTypes.js] ${src} > ${dest} failed`);
  }

  console.log(`[copyGeneratedStrapiTypes.js] Copying common...`);
  src = '../backend/src/common';
  dest = './src/types/common';
  cpSync(src, dest, { recursive: true });

  console.log(
    `[copyGeneratedStrapiTypes.js] Overwriting common/schemas-to-ts/Media.ts with flattened version...`,
  );
  try {
    cpSync(
      './src/types/common/schemas-to-ts/MediaFlattened.ts',
      './src/types/common/schemas-to-ts/Media.ts',
      {},
    );
  } catch {
    console.log(
      `[copyGeneratedStrapiTypes.js] ${'./src/types/common/schemas-to-ts/MediaFlattened.ts'} > ${'./src/types/common/schemas-to-ts/Media.ts'} failed`,
    );
  }

  console.log(`[copyGeneratedStrapiTypes.js] Removing unnecessary files...`);
  rmSync('./src/types/common/schemas-to-ts/AfterRunEvent.ts');
  rmSync('./src/types/common/schemas-to-ts/BeforeRunEvent.ts');

  return;
})();
