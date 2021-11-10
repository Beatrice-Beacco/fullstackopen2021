import anecdotesService from '../services/anecdotes'


const reducer = (state = [], action) => {

  switch (action.type) {
    case 'LIKE':
      const liked = state.map((element) => {
        if (element.id == action.data.id){
          return ({...element, votes: element.votes +1})
        } else {
          return element
        }
      })

      const sorted = liked.sort((firstItem, secondItem) => secondItem.votes - firstItem.votes)

      return sorted

    case 'NEW':
      return state.concat(action.data)
    
    case 'INIT':
      return action.data

    default: 
      return state
  }
}

export const voteEntry = (id) => {
  return{
    type: 'LIKE',
    data: {
      id
    }
  }
}

export const addNew = (data) => {
    return{
    type: 'NEW',
    data
    }
  }

export const initializeAnecdotes = () => {
  return async dispatch => {
    const entries = await anecdotesService.getAll()
    dispatch({
      type: 'INIT',
      data: entries,
    })
  }
 }
 

export default reducer