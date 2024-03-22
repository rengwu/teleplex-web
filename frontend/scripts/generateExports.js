const { resolve } = require('path');
const { readdir } = require('fs').promises;
const { writeFile, appendFile } = require('fs');

// folders containing assets
const assets = [
  {
    path: './src/assets/images',
    extensions: ['svg', 'png', 'jpg', 'jpeg', 'webp', 'gif'],
  },
];

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

const writeFileCallback = (err) => {
  if (err) console.log(err);
};

(async () => {
  for await (const { path: dir, extensions } of assets) {
    console.log(`[generateExports.js] Generating exports for ${dir}...`);
    const exportsFilePath = `${dir}/index.ts`;
    writeFile(exportsFilePath, '', writeFileCallback);
    const exports = [];
    for await (const f of getFiles(dir)) {
      const extension = f.slice(-4).replace('.', '');
      if (extensions.includes(extension)) {
        const dirTrimmed = dir.replace(/^.(.*)$/, '$1'); // trim leading period
        const relativePath = f.replace(
          new RegExp(`^(.*)(${dirTrimmed})(.*)$`), // remove path prefix
          '$3',
        );

        const fileName = relativePath
          .replace(/.[a-z0-9]*$/, '')
          .split(/\/|-|_/) // filter out / - _ characters
          .reduce(
            (a, c) => `${a}${c.charAt(0).toUpperCase() + c.slice(1)}`,
            '',
          ); // capitalise first letter

        exports.push([fileName, relativePath]);
      }
    }
    const sortedExportStrings = exports
      .sort((a, b) => {
        return a[1] < b[1];
      })
      .map(
        ([fileName, relativePath]) =>
          `export * as ${fileName} from ".${relativePath}";`,
      );
    appendFile(
      exportsFilePath,
      sortedExportStrings.join('\n'),
      writeFileCallback,
    );
  }
  return;
})();
