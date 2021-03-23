import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const UPDATE_NAVBAR = 'UPDATE_NAVBAR'

/**
 * INITIAL STATE
 */
const initalState = {page: null, items: {}}

/**
 * ACTION CREATORS
 */
export const updateNavbar = (page, items) => ({
  type: UPDATE_NAVBAR,
  page,
  items,
})

/**
 * THUNK CREATORS
 */
// export const thunkName = () => async (dispatch) => {
//   try {
//     const res = await axios.get('/api/route')
//     dispatch(creatorInput(res.data))
//   } catch (err) {
//     console.error(err)
//   }
// }

/**
 * REDUCER
 */
export default (state = initalState, action) => {
  switch (action.type) {
    case UPDATE_NAVBAR:
      return {page: action.page, items: action.items}
    default:
      return state
  }
}
