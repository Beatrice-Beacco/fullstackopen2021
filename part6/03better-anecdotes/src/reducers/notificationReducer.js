const reducer = (state = "", action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case "ADD":
      return action.data.msg
    case "REMOVE":
      return ""
    default: 
      return state
  }
}

export const addMessage = (msg) => {
  return{
    type: 'ADD',
    data: {
      msg
    }
  }
}

export const removeMessage = () => {
  return{
    type: 'REMOVE'
  }
}

export default reducer