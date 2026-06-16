import { renderToString } from 'react-dom/server'
import App from './App'

// Used at build time by prerender.js to bake all report content into the
// static HTML, so every figure is present on first byte (no JS required to read).
export function render(): string {
  return renderToString(<App />)
}
