import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

// Self-hosted variable fonts → bundled by Vite → works fully offline.
import '@fontsource-variable/inter'
import '@fontsource-variable/plus-jakarta-sans'

import './index.css'
import App from './App.jsx'
import { StoreProvider } from './store/store.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <StoreProvider>
        <App />
      </StoreProvider>
    </HashRouter>
  </StrictMode>,
)
