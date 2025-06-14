import { createContext, useState, useEffect, useContext } from 'react'
import api from '../services/api'
import {jwtDecode} from 'jwt-decode'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    
    if (token) {
      const decoded = jwtDecode(token)
      setUser(decoded)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    
    setLoading(false)
  }, [])

  const login = async (email, senha) => {
    try {
      const { data } = await api.post('/login', { email, senha })
      localStorage.setItem('token', data.token)
      setUser(data.usuario)
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
      return data
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)