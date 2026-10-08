import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import './styles/global.css'

const root = document.getElementById('root')!
const app = (
    <React.StrictMode>
        <App />
    </React.StrictMode>
)

// Production pages arrive prerendered (scripts/prerender-routes.mjs): hydrate them in place.
// The dev server serves the empty shell, which needs a plain client render.
if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, app)
else ReactDOM.createRoot(root).render(app)
