import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import MPStart from './MPStart.tsx'
import { Provider } from 'react-redux'
import store from "./Store/store.ts"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <MPStart />
      <App />
    </Provider>
  </StrictMode>,
)
