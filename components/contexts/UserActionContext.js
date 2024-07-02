import { createContext, useReducer } from 'react'

export const UserActionContext = createContext()

const initialState = []

function reducer (state, action) {
  switch (action.type) {
    case 'filterApplied':
      // We have completed step 1
      return [...new Set([...state, 2])]
    case 'courseSaved':
      // We have completed step 2
      return [...new Set([...state, 3])]
    case 'courseScheduled':
      // We have completed step 3
      return [...new Set([...state, 4])]
    case 'reset':
      return initialState
    default:
      return initialState
  }
}

export function UserActionProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserActionContext.Provider value={[state, dispatch]}>
      {children}
    </UserActionContext.Provider>
  )
}
