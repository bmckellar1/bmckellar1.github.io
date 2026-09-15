// Emit actual HTML entry files so direct project links work on static hosts.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { profile, projects } from '../src/content.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = resolve(root, 'dist');
const template = await readFile(resolve(dist, 'index.html'), 'utf8');
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
function page(title, description) {
  return template.replace(/<title>.*?<\/title>/s, `<title>${escape(title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*("\s*\/?\s*>)/, (_, before, after) => before + escape(description) + after);
}
await writeFile(resolve(dist, 'index.html'), page(`${profile.name} | Mechanical Engineering Portfolio`, profile.introduction));
for (const project of projects) {
  if (!/^[a-z0-9-]+$/.test(project.id)) throw new Error(`Invalid project id: ${project.id}`);
  const folder = resolve(dist, 'projects', project.id);
  await mkdir(folder, { recursive: true });
  await writeFile(resolve(folder, 'index.html'), page(`${project.title} | ${profile.name}`, project.summary));
}
await writeFile(resolve(dist, '404.html'), page(`Page not found | ${profile.name}`, 'The requested project was not found.'));
console.log(`Created ${projects.length} standalone project entry pages and a 404 page.`);
