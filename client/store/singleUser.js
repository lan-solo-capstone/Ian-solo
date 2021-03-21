import axios from 'axios'

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
