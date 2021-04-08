import axios from 'axios'
import {me} from './user'
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

// the user subreducer will be for validating logins
// this one will be to fetch a single user to view as an admin -- JC

// Action types
const GET_EXISTING_USER = 'GET_EXISTING_USER'
const EDIT_EXISTING_USER = 'EDIT_EXISTING_USER'

// Action creators
const getExistingUser = (user) => ({type: GET_EXISTING_USER, user})
const editExistingUser = (user) => ({type: EDIT_EXISTING_USER, user})

// Thunk creators
export const fetchExistingUser = (userId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/users/${userId}`)
      dispatch(getExistingUser(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const modifyExistingUser = (userId, modifications) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.put(`/api/users/${userId}`, modifications)
      dispatch(editExistingUser(data))
      dispatch(me())

      // if user profile was updated successfully, toast notification and
      // scroll smoothly to top -- JC 4.1.21
      if (data.updatedAt) {
        window.scrollTo({top: 0, behavior: 'smooth'})
        toast.success('Changes saved!', toastSettings)
      } else {
        toast.warning('Changes failed =(. Resubmit?', toastSettings)
      }
    } catch (err) {
      console.error(err)
    }
  }
}

// Subreducer

const defaultUser = {}

export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_EXISTING_USER:
      return action.user
    case EDIT_EXISTING_USER:
      return action.user
    default:
      return state
  }
}
