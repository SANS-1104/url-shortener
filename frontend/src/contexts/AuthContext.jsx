import React, { createContext, useContext, useState, useEffect } from 'react'
import { apiClient } from '../lib/api'

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('linkshort_token')

      if (!token) {
        setIsLoading(false)
        return
      }

      try {
        const userData = await apiClient.get('/auth/me', true)

        setUser(userData)
        localStorage.setItem(
          'linkshort_user',
          JSON.stringify(userData)
        )
      } catch (error) {
        logout() // token invalid or expired
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = async (email, password) => {
    const response = await apiClient.postForm('/auth/login', {
      username: email,
      password: password,
    })

    const token = response.access_token

    localStorage.setItem('linkshort_token', token)

    // Immediately fetch real user
    const userData = await apiClient.get('/auth/me', true)

    setUser(userData)
    localStorage.setItem(
      'linkshort_user',
      JSON.stringify(userData)
    )
  }

  const signup = async (name, email, password) => {
    await apiClient.post('/auth/register', {
      name,
      email,
      password,
    })

    await login(email, password)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('linkshort_token')
    localStorage.removeItem('linkshort_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
