import markdownit from 'markdown-it';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export default function(pathToFile) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, pathToFile);
  const file = readFileSync(filePath, 'utf8');
  const md = markdownit();
  return md.render(file);
}
