import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const toastSettings = {
  position: 'top-right',
  autoClose: 5001,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
}

/**
 * ACTION TYPES
 */
const FETCH_USER_ITEMS = 'FETCH_USER_ITEMS'
const DELETE_SINGLE_ITEM = 'DELETE_SINGLE_ITEM'
const EDIT_ITEM = 'EDIT_ITEM'

/**
 * INITIAL STATE
 */
const initalState = {loading: true, items: []}

/**
 * ACTION CREATORS
 */
const userItems = (items) => ({type: FETCH_USER_ITEMS, items})
const deleteSingleItem = (item) => {
  return {
    type: DELETE_SINGLE_ITEM,
    item,
  }
}
const editItem = (item) => {
  return {
    type: EDIT_ITEM,
    item,
  }
}

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
export const deleteSingleItemRoute = (itemId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.delete(`/api/items/${itemId}`)
      dispatch(deleteSingleItem(data))
      toast.success('The item was successfully deleted!', toastSettings)
    } catch (error) {
      console.error(error)
    }
  }
}

export const modifyItem = (itemId, modifications, toastMessage) => {
  return async (dispatch) => {
    try {
      const modifiedItem = (
        await axios.put(`/api/items/${itemId}`, modifications)
      ).data
      dispatch(editItem(modifiedItem))

      if (modifiedItem.updatedAt) {
        console.log(
          '########### in modifyItem thunk, success, refactored for close/open, toast happening now  with refactored toastMessage!!! @!@@#$@#%#$%$#--------'
        )
        toast.success(toastMessage, toastSettings)
      } else {
        toast.warning('Something went wrong, sorry!', toastSettings)
      }
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
export default (state = initalState, action) => {
  switch (action.type) {
    case FETCH_USER_ITEMS:
      return {loading: false, items: action.items}
    case EDIT_ITEM:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.item.id) {
            return action.item
          }
          return item
        }),
      }
    case DELETE_SINGLE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.item.id),
      }
    default:
      return state
  }
}
