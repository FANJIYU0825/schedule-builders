import { createContext, useReducer } from 'react'

export const TutorialStepperContext = createContext()

function reducer (state, action) {
  switch (action.type) {
    case 'increment':
      return { index: state.index + 1 }
    case 'decrement':
      return state.index === 0 ? { index: state.index } : { index: state.index - 1 }
    case 'reset':
      return initialState
    case 'set':
      return { index: action.payload }
    default:
      return false
  }
}

const initialState = { index: 0 }

export function TutorialStepperProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <TutorialStepperContext.Provider value={[state, dispatch]}>
      {children}
    </TutorialStepperContext.Provider>
  )
}
