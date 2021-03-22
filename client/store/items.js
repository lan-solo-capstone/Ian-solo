import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ALL_ITEMS = 'ALL_ITEMS'

/**
 * INITIAL STATE
 */
const intialState = {loading: true, items: []}

/**
 * ACTION CREATORS
 */
const allItems = (items) => ({type: ALL_ITEMS, items})

/**
 * THUNK CREATORS
 */
export const fetchAllItems = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/items')
    dispatch(allItems(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default (state = intialState, action) => {
  switch (action.type) {
    case ALL_ITEMS:
      return {...state, loading: false, items: action.items}
    default:
      return state
  }
}
