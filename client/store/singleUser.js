/* eslint-disable no-warning-comments */
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

// TODO: rename this file and subreducer to indicate why it is separate from user. It's because user is for logging in. Not sure if we can combine them -- JC 4.1.21

// I think we need to separate this subreducer from the user subreducer
// the user subreducer will be for validating logins
// this one will be to fetch a single user to view as an admin -- JC

// Action type
const GET_EXISTING_USER = 'GET_EXISTING_USER'
const EDIT_EXISTING_USER = 'EDIT_EXISTING_USER'

// Action creator
const getExistingUser = (user) => ({type: GET_EXISTING_USER, user})
const editExistingUser = (user) => ({type: EDIT_EXISTING_USER, user})

// Thunk creator
export const fetchExistingUser = (userId) => {
  console.log('in fetchExistingUser', {userId})
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
  console.log(
    'in modifyExistingUser, userId, modifications',
    userId,
    modifications
  )
  return async (dispatch) => {
    try {
      const {data} = await axios.put(`/api/users/${userId}`, modifications)
      dispatch(editExistingUser(data))
      dispatch(me())

      // if user profile was updated successfully, toast notification and
      // scroll smoothly to top -- JC 4.1.21
      if (data.updatedAt) {
        window.scrollTo({top: 0, behavior: 'smooth'})
        toast.success('Your changes have been saved!', toastSettings)
      } else {
        toast.warning(
          'Sorry, something went wrong. =( Maybe try again, or contact an admin to report a problem editing your profile.',
          toastSettings
        )
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
