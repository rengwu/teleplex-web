const { cpSync, rmSync, readdirSync, existsSync } = require('fs');

async function getFolderNames(dir) {
  const dirents = readdirSync(dir, { withFileTypes: true });
  let dirs = [];
  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      dirs.push(dirent.name);
    }
  }
  return dirs;
}

(async () => {
  let src, dest;

  console.log(`[copyGeneratedStrapiTypes.js] Copying content-types...`);
  const apiFolderPath = '../backend/src/api';
  let folderNames = await getFolderNames(apiFolderPath);
  for (const folderName of folderNames) {
    const src = `${apiFolderPath}/${folderName}/content-types`;
    if (existsSync(src)) {
      const dest = `./src/types/api/${folderName}/content-types`;
      cpSync(src, dest, { recursive: true });
    } else {
      console.log(
        `[copyGeneratedStrapiTypes.js] dir doesn't exist, skipping ${src}`,
      );
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
