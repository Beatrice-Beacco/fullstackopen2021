const reducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case "SET":
      return action.data.filter
    default: 
      return state
  }
}

export const setFilter = (filter) => {
  return{
    type: 'SET',
    data: {
      filter
    }
  }
}

export default reducer