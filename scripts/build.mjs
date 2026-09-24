import { cp, readFile, writeFile } from 'node:fs/promises';
import { buildInfo } from './build-info.mjs';
const info = buildInfo();
await cp('public', 'dist', {recursive:true});
const source = await readFile('public/index.html','utf8');
const placeholder = '<span id="build-reference">Local preview</span>';
if (!source.includes(placeholder)) throw new Error('Build reference placeholder missing');
const stamp = info.commit
  ? `<a id="build-reference" href="https://github.com/alankool-dev/2016_Code_of_Conduct/commit/${info.commit}" title="View this build on GitHub">${info.label}</a>`
  : `<span id="build-reference">${info.label}</span>`;
await writeFile('dist/index.html',source.replace(placeholder,stamp));
await writeFile('dist/build.json',JSON.stringify(info,null,2)+'\n');
console.log(info.label);
