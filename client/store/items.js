import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ALL_ITEMS = 'ALL_ITEMS'

//04.1.21 ADD : resetting loading status = true
const ALL_ITEMS_UNLOAD = 'ALL_ITEMS_UNLOAD'

/**
 * INITIAL STATE
 */
const intialState = {loading: true, items: []}

/**
 * ACTION CREATORS
 */
const allItems = (items) => ({type: ALL_ITEMS, items})

//04.1.21 ADD : resetting loading status = true
export const allItemsUnload = () => ({
  type: ALL_ITEMS_UNLOAD,
})

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
    //04.1.21 ADD : resetting loading status = true
    case ALL_ITEMS_UNLOAD:
      return {...state, loading: true}
    default:
      return state
  }
}
