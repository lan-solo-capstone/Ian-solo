import axios from 'axios'

const GET_USERS = 'GET_USERS'

const getUsers = (users) => ({type: GET_USERS, users})

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
const initialState = []

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    default:
      return state
  }
}
