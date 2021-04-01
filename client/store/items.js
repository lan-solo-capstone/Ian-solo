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

//04.1.21 ADD : resetting loading status = true
const ALL_ITEMS_UNLOAD = 'ALL_ITEMS_UNLOAD'

const DELETE_ITEM = 'DELETE_ITEM'
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

export const removeItem = (itemId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.delete(`/api/items/${itemId}`)
      dispatch(deleteItem(data))
      toast.success('The item was successfully deleted!', toastSettings)
      console.log(
        'in removeItem thunk, about to delete item, here is the deleted item',
        data
      )

      if (data.updatedAt) {
        console.log('successfully deleted!!!!! ------!!!!!!!!!')
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
    //04.1.21 ADD : resetting loading status = true
    case ALL_ITEMS_UNLOAD:
      return {...state, loading: true}
    case DELETE_ITEM: {
      console.log(
        'laskjflaskfjasdlk in delete item case, action.item',
        action.item
      )
      const copyOfState = {...state}
      console.log('HEEEEEEY, in delete item case, copyOfState', copyOfState)
      const {items} = copyOfState
      console.log('in delete item case, items array', items)
      const filteredItems = items.filter((item) => item.id !== action.item.id)

      return {...state, items: filteredItems, loading: false}
    }
    default:
      return state
  }
}
