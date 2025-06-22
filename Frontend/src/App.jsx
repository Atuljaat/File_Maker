import { useState } from 'react'
import Navbar from './myUI/Navbar'
import Home from './myUI/Home'
import Footer from './myUI/Footer'
import { Route, Routes } from 'react-router-dom'
import File from './myUI/File'
import Login from './myUI/Login'
import Signup from './myUI/Signup'
import { Toaster } from 'sonner'
import Pricing from './myUI/Pricing'
import { SignIn, SignedOut } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'
import AuthMiddleware from './myUI/AuthMiddleware'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/create' element={
          <>
          <AuthMiddleware>
              <File />
          </AuthMiddleware>
          </> 
        } />
      </Routes>
      <Footer />
    </>
  )
}

export default App
