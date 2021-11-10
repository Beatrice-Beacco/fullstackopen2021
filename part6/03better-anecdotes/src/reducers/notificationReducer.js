const reducer = (state = "", action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case "ADD":
      return action.data.message
    case "REMOVE":
      return ""
    default: 
      return state
  }
}

export const setNotification = (message, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'ADD',
      data: {
      message
      }
    })

    setTimeout(()=> {
      dispatch({
        type: 'REMOVE'
      })
    }, timeout * 1000)
  }
}

export default reducer