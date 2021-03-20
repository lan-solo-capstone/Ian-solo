import axios from 'axios'

const GET_USERS = 'GET_USERS'
const DELETE_EXISTING_USER = 'DELETE_EXISTING_USER'

const getUsers = (users) => ({type: GET_USERS, users})
const deleteExistingUser = (user) => ({type: DELETE_EXISTING_USER, user})

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(getUsers(data))
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

const initialState = []

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    default:
      return state
  }
}
