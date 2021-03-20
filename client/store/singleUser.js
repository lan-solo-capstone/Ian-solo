import axios from 'axios'

const GET_EXISTING_USER = 'GET_EXISTING_USER'
const getExistingUser = (user) => ({type: GET_EXISTING_USER, user})
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

const defaultUser = {}

export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_EXISTING_USER:
      return action.user
    default:
      return state
  }
}
