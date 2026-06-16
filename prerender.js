// Post-build static prerender: render <App/> to HTML and inject it into
// dist/index.html so the full report is readable from the raw HTML (a simple
// fetch sees every metric — no client-side JS execution required).
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const dir = path.dirname(url.fileURLToPath(import.meta.url))
const abs = (p) => path.resolve(dir, p)

const { render } = await import(url.pathToFileURL(abs('./dist/server/entry-server.js')).href)
const appHtml = render()

const templatePath = abs('./dist/index.html')
const template = fs.readFileSync(templatePath, 'utf-8')

if (!template.includes('<!--app-html-->')) {
  throw new Error('Placeholder <!--app-html--> not found in dist/index.html')
}

fs.writeFileSync(templatePath, template.replace('<!--app-html-->', appHtml))
console.log(`Prerendered dist/index.html (+${appHtml.length} chars of report HTML)`)
