import React, { createContext, useContext, useReducer } from 'react'
import _ from 'lodash'

const DocumentContext = createContext()
DocumentContext.displayName = 'DocumentContext'

export const DocumentProvider = ({ children }) => {

  const initialState = {
    profiles: [],
    filteredProfiles: [],
    profilePageNumber: 0,
    profileLimit: 50,
    pageCount: 10,
    currentPage: 1
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'ADD_PROFILES':
        const documents = _.concat(state.profiles, action.payload)
        return {
          ...state,
          profiles: documents
        }
      case 'NEXT_PAGE':
        if (state.currentPage < state.pageCount) {
          return {
            ...state,
            currentPage: state.currentPage + 1
          }
        } else {
          return state
        }
      case 'PREVIOUS_PAGE':
        if (state.currentPage > 1) {
          return {
            ...state,
            currentPage: state.currentPage - 1
          }
        } else {
          return state
        }
      case 'JUMP_PAGE':
        if (action.payload <= state.pageCount) {
          return {
            ...state,
            currentPage: action.payload
          }
        } else {
          return state
        }
      default:
        return state
    }
  }

  return (
    <DocumentContext.Provider value={useReducer(reducer, initialState)}>
      { children }
    </DocumentContext.Provider>
  )
}


export const UseDocumentContext = () => useContext(DocumentContext)