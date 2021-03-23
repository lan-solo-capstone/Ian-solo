import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const FETCH_USER_ITEMS = 'FETCH_USER_ITEMS'

/**
 * INITIAL STATE
 */
const initalState = {loading: true, items: []}

/**
 * ACTION CREATORS
 */
const userItems = (items) => ({type: FETCH_USER_ITEMS, items})

/**
 * THUNK CREATORS
 */
export const fetchUserItems = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`api/users/${id}`)
    dispatch(userItems(res.data.items))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default (state = initalState, action) => {
  switch (action.type) {
    case FETCH_USER_ITEMS:
      return {loading: false, items: action.items}
    default:
      return state
  }
}
