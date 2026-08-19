import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import posthog from 'posthog-js'
import './index.css'
import App from './App.tsx'

posthog.init('phc_Chn6rCXdUxevGkYMc7MQRRs7kfbwM2moYV8NzPEvH3Bn', {
  api_host: 'https://us.i.posthog.com',
  defaults: '2026-05-30',
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
