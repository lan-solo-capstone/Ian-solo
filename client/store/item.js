/* eslint-disable no-warning-comments */
import axios from 'axios'
import history from '../history'
import {storage} from '../../firebase/firebase'

const CREATE_NEW_ITEM = 'CREATE_NEW_ITEM'
const EDIT_ITEM = 'EDIT_ITEM'

export const createNewItem = (item) => {
  return {
    type: CREATE_NEW_ITEM,
    item,
  }
}

const editItem = (item) => {
  return {
    type: EDIT_ITEM,
    item,
  }
}

export const postNewItem = (item) => {
  return async (dispatch) => {
    try {
      let fileInfo = {
        itemType: item.itemType,
        itemListName: item.itemListName,
        description: item.description,
        itemCondition: item.itemCondition,
        userId: item.user.id,
        imageArr: [],
      }

      if (item.uploadPhoto) {
        const imageInfo = await Promise.all(
          item.uploadPhoto.map(async (element) => {
            const random = `/images/${element.name}${Math.floor(
              Math.random() * 100000
            )}`

            const cloudCreate = await storage.ref(random).put(element)

            const url = await storage.ref(random).getDownloadURL()

            return {
              cloudRef: random,
              downloadUrl: url,
              photoTitle: element.name,
            }
          })
        )
        fileInfo.imageArr = imageInfo
      }

      // vv test vv  below axios call is for testing purpose - visualize formData vv //

      // axios
      //   .post('https://httpbin.org/anything', fileInfo)
      //   .then((res) => {
      //     console.log(res)
      //   })
      //   .catch((err) => console.log(err))

      // ^^ test ^^//

      //sending formData to api(express)
      const {data} = await axios.post(`/api/items`, fileInfo)

      dispatch(createNewItem(data))
      history.push('/useraccount')
    } catch (err) {
      console.error(err)
    }
  }
}

// this can be renamed to editItem and rewritten to edit any part of the item -- JC 03.26.21
export const modifyItem = (itemId, modifications) => {
  return async (dispatch) => {
    try {
      const modifiedItem = (
        await axios.put(`/api/items/${itemId}`, modifications)
      ).data
      dispatch(editItem(modifiedItem))

      // TODO: redirect to /singleview and pass props
      // history.push /singleview {props}
      history.push('/singleview', {item: modifiedItem})
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
    case EDIT_ITEM:
      return action.item
    default:
      return state
  }
}
