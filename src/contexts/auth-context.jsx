"use client"

import { createContext, useContext, useReducer, useEffect } from "react"

const AuthContext = createContext()

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      }
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      }
    case "LOAD_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        loading: false,
      }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    loading: true,
  })

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      dispatch({ type: "LOAD_USER", payload: JSON.parse(savedUser) })
    } else {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user))
    } else {
      localStorage.removeItem("user")
    }
  }, [state.user])

  const login = async (email, password) => {
    dispatch({ type: "SET_LOADING", payload: true })

    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock authentication - in real app this would be an API call
        if (email && password) {
          // Check if it's admin login
          const isAdmin = email === 'admin@example.com'
          const user = {
            id: 1,
            email: email,
            name: email.split("@")[0],
            avatar: null,
            role: isAdmin ? 'admin' : 'user',
          }
          dispatch({ type: "LOGIN", payload: user })
          resolve(user)
        } else {
          dispatch({ type: "SET_LOADING", payload: false })
          reject(new Error("Invalid credentials"))
        }
      }, 1000)
    })
  }

  const signup = async (name, email, password) => {
    dispatch({ type: "SET_LOADING", payload: true })

    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock registration - in real app this would be an API call
        if (name && email && password) {
          const user = {
            id: Date.now(),
            email: email,
            name: name,
            avatar: null,
            role: 'user', // New users are always regular users
          }
          dispatch({ type: "LOGIN", payload: user })
          resolve(user)
        } else {
          dispatch({ type: "SET_LOADING", payload: false })
          reject(new Error("Registration failed"))
        }
      }, 1000)
    })
  }

  const logout = () => {
    dispatch({ type: "LOGOUT" })
  }

  const value = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    login,
    signup,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
