import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'

function AuthMiddleware({children}) {
    const { isSignedIn , isLoaded } = useUser()
    if (!isLoaded) return null
    return (isSignedIn ? children : <Navigate to={'/login'} replace />)
}

export default AuthMiddleware   