import axios from 'axios'
import history from '../history'

const CREATE_NEW_ITEM = 'CREATE_NEW_ITEM'

export const createNewItem = (item) => {
  return {
    type: CREATE_NEW_ITEM,
    item,
  }
}

export const postNewItem = (item) => {
  return async (dispatch) => {
    try {
      //append text data from the form
      const formData = new FormData()

      formData.append('itemType', item.itemType)
      formData.append('itemListName', item.itemListName)
      formData.append('description', item.description)
      formData.append('itemCondition', item.itemCondition)
      formData.append('userId', item.user.id)

      //append file data from the form - if item.uploadPhoto IS NOT null
      if (item.uploadPhoto) {
        for (let i = 0; i < item.uploadPhoto.length; i++) {
          formData.append(`${item.uploadPhoto[i].name}`, item.uploadPhoto[i])
        }
      }

      // vv test vv  below axios call is for testing purpose - visualize formData vv //
      axios
        .post('https://httpbin.org/anything', formData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))

      // ^^ test ^^//

      //sending formData to api(express)
      const {data} = await axios.post(`/api/users/post`, formData)

      dispatch(createNewItem(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = {}
export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_NEW_ITEM:
      return action.item
    default:
      return state
  }
}
