import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, "../dist");
const indexPath = path.join(distDir, "index.html");

let html = fs.readFileSync(indexPath, "utf8");

html = html.replace(
  /<link rel="stylesheet" crossorigin href="\.\/([^"]+)">/,
  (_match, cssPath) => {
    const css = fs.readFileSync(path.join(distDir, cssPath), "utf8");
    return `<style>\n${css}\n</style>`;
  },
);

html = html.replace(
  /<script type="module" crossorigin src="\.\/([^"]+)"><\/script>/,
  (_match, jsPath) => {
    const js = fs
      .readFileSync(path.join(distDir, jsPath), "utf8")
      .replace(/new URL\("([^".][^"]*)",import\.meta\.url\)/g, 'new URL("./assets/$1",import.meta.url)');
    return `<script type="module">\n${js}\n</script>`;
  },
);

fs.writeFileSync(indexPath, html);
console.log("Portable index.html created.");
