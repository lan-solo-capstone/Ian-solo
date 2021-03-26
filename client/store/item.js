import axios from 'axios'
import history from '../history'
import {storage} from '../../firebase/firebase'

const CREATE_NEW_ITEM = 'CREATE_NEW_ITEM'
const MARK_ITEM_CLOSED = 'MARK_ITEM_CLOSED'

export const createNewItem = (item) => {
  return {
    type: CREATE_NEW_ITEM,
    item,
  }
}

const markItemClosed = (item) => {
  return {
    type: MARK_ITEM_CLOSED,
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

export const closeItem = (itemId) => {
  return async (dispatch) => {
    try {
      const closedItem = await axios.put(`/api/item/${itemId}`, {
        status: 'Closed',
      }).data
      dispatch(markItemClosed(closedItem))
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
    case MARK_ITEM_CLOSED:
      return action.item
    default:
      return state
  }
}
