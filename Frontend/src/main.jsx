import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'


const clerkAPIkey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkAPIkey) {
  console.log("clerk api key is not there")
  throw new Error("Insert clerk api key")
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkAPIkey}
      afterSignOutUrl='/'
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
)
