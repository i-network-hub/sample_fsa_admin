import React, { createContext, useContext, useReducer } from 'react'
import _ from 'lodash'

export const UserContext = createContext()
UserContext.displayName = 'UserContext'


export const UserProvider = ({ children, value }) => {

  const initialState = {
    isSignedIn: false,
    level: 'user',
    profile: '',
    account: ''
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SIGN_IN':
        return {
          ...state,
          isSignedIn: true
        }
      case 'SET_PROFILE':
        return {
          ...state,
          profile: action.payload
        }
      case 'SET_ACCOUNT':
        return {
          ...state,
          account: action.payload
        }
      default:
        return state
    }
  }

  return (
    <UserContext.Provider value={useReducer(reducer, value || initialState) }>
      { children }
    </UserContext.Provider>
  )
}

export const UserContextValue = () => useContext(UserContext)