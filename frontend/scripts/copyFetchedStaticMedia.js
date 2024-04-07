const { cpSync, rmSync, existsSync } = require('fs');

// copies fetched static media from ./tmp into static build output ./out
(async () => {
  const src = './.tmp/';
  const dest = './out/';
  if (existsSync(src)) {
    console.log(
      `[copyFetchedStaticMedia.js] Copying fetched static media from ${src} to ${dest}`,
    );
    cpSync(src, dest, { recursive: true });
    console.log(`[copyFetchedStaticMedia.js] Removing ${src}`);
    rmSync(src, { recursive: true });
  } else {
    console.log(
      `[copyFetchedStaticMedia.js] ${src} does not exist, aborting...`,
    );
  }
  return;
})();
