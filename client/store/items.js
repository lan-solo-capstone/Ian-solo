import axios from 'axios'
import history from '../history'
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
const ALL_ITEMS = 'ALL_ITEMS'
const ALL_ITEMS_UNLOAD = 'ALL_ITEMS_UNLOAD'
const DELETE_ITEM = 'DELETE_ITEM'
const DELETE_SINGLE_ITEM = 'DELETE_SINGLE_ITEM'

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

const deleteItem = (item) => {
  return {
    type: DELETE_ITEM,
    item,
  }
}

const deleteSingleItem = (item) => {
  return {
    type: DELETE_ITEM,
    item,
  }
}

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

export const removeItem = (itemId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.delete(`/api/items/${itemId}`)
      dispatch(deleteItem(data))

      if (data.updatedAt) {
        toast.success('The item was successfully deleted!', toastSettings)
      }

      history.push('/')
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */

export default (state = intialState, action) => {
  switch (action.type) {
    case ALL_ITEMS:
      return {...state, loading: false, items: action.items}
    case ALL_ITEMS_UNLOAD:
      return {...state, loading: true}
    case DELETE_SINGLE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.item.id),
      }
    case DELETE_ITEM: {
      const copyOfState = {...state}
      const {items} = copyOfState
      const filteredItems = items.filter((item) => item.id !== action.item.id)

      return {...state, items: filteredItems, loading: false}
    }
    default:
      return state
  }
}
