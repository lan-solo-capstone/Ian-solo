import axios from 'axios'

// I think we need to separate this subreducer from the user subreducer
// the user subreducer will be for validating logins
// this one will be to fetch a single user to view as an admin -- JC

// Action type
const GET_EXISTING_USER = 'GET_EXISTING_USER'
const DELETE_EXISTING_USER = 'DELETE_EXISTING_USER'

// Action creator
const getExistingUser = (user) => ({type: GET_EXISTING_USER, user})
const deleteExistingUser = (user) => ({type: DELETE_EXISTING_USER, user})

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

export const removeExistingUser = (userId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.delete(`/api/users/${userId}`)
      dispatch(deleteExistingUser(data))
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
    default:
      return state
  }
}
