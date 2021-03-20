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
      console.log('processing thunk')
      console.log('item', item)

      //append text data from the form
      const formData = new FormData()

      formData.append('itemType', item.itemType)
      formData.append('itemListName', item.itemListName)
      formData.append('description', item.description)
      formData.append('itemCondition', item.itemCondition)

      //append file data from the form
      formData.append('file', item.uploadPhoto)

      //vv below axios call are for the testing purpose vv //
      axios
        .post('https://httpbin.org/anything', formData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))

      // ^^ test ^^//

      //sending formData to api
      const {data} = await axios.post(`/api/users/post`, formData)
      // {itemListName, description, itemType, itemCondition, uploadPhoto}
      //console.log('hello', 'in postNewItem thunk', {formData, data})
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
