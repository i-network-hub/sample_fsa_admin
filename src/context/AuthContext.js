import React, { createContext, useContext, useReducer } from 'react'
import _ from 'lodash'

export const AuthContext = createContext()
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }) => {
  const initialState = {
    isSignedIn: false,
    level: 'user'
  }

  const reducer = (state, {type, payload }) => {
    switch (type) {
      case 'SIGN_IN':
        return {
          ...state,
          isSignedIn: true
        }
      case 'SIGN_OUT':
        return {
          ...state,
          isSignedIn: false
        }
      default:
        return state
    }
  }

  return (
    <AuthContext.Provider value={useReducer(reducer, initialState)}>
      { children }
    </AuthContext.Provider>
  )
}

export const AuthContextValue = () => useContext(AuthContext)