import { createContext, useReducer } from 'react'

export const FilterContext = createContext()

const initialState = { filters: {}, toggleSavedCourses: false, showFilters: false }

const addFilter = (state, filterOption, input) => {
  if (input.length === 0) return removeFilter(state, filterOption)
  return { ...state, filters: { ...state.filters, [filterOption]: input } }
}

const removeFilter = (state, filterOption) => {
  const copy = { ...state.filters }
  delete copy[filterOption]
  return { ...state, filters: { ...copy } }
}

function reducer (state, action) {
  switch (action.type) {
    case 'addFilter':
      return addFilter(state, action.payload.option, action.payload.input)
    case 'removeFilter':
      return removeFilter(state, action.payload)
    case 'clearFilters':
      return { ...state, filters: {} }
    case 'toggleSavedCourses':
      return { ...state, toggleSavedCourses: !state.toggleSavedCourses }
    case 'toggleShowFilters':
      return { ...state, showFilters: !state.showFilters }
  }
}

export function FilterProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <FilterContext.Provider value={[state, dispatch]}>
      {children}
    </FilterContext.Provider>
  )
}
