import axios from 'axios'
import history from '../history'

const CREATE_NEW_ITEM = 'CREATE_NEW_ITEM'

export const createNewItem = (item) => {
  return {
    type: CREATE_NEW_ITEM,
    item,
  }
}

export const postNewItem = (item) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.post(`/api/users/post`, item)
      console.log('hello', 'in postNewItem thunk', {item, data})
      dispatch(createNewItem(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = {}
export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_NEW_ITEM:
      return action.item
    default:
      return state
  }
}
