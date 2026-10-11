import { readFile, writeFile } from 'node:fs/promises'
import { render } from '../.prerender/entry-server.js'

const target = new URL('../dist/index.html', import.meta.url)
const template = await readFile(target, 'utf8')
if (!template.includes('<!--app-html-->')) throw new Error('Missing prerender placeholder')
const html = template.replace('<!--app-html-->', render())
if (!html.includes('Your next opportunity')) throw new Error('Static content was not rendered')
await writeFile(target, html)
console.log('Prerendered the complete page into dist/index.html')
