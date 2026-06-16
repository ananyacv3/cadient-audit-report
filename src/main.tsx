import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const root = document.getElementById('root')!

// Prerendered builds ship real markup inside #root -> hydrate it.
// The dev server ships only a placeholder comment -> client render.
if (root.firstElementChild) {
  hydrateRoot(root, <App />)
} else {
  createRoot(root).render(<App />)
}
