import axios from 'axios'
import history from '../history'
import {storage} from '../../firebase/firebase'
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

export const postNewItem = (item, userId) => {
  return async (dispatch) => {
    try {
      let fileInfo = {
        itemType: item.itemType,
        itemListName: item.itemListName,
        description: item.description,
        itemCondition: item.itemCondition,
        userId: userId,
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

      //sending formData to api(express)
      const {data} = await axios.post(`/api/items`, fileInfo)

      dispatch(createNewItem(data))

      if (data.createdAt) {
        toast.success('Success!', toastSettings)
        history.push('/useraccount')
      } else {
        toast.warning('Failed! =( Try again?', toastSettings)
      }
    } catch (err) {
      console.error(err)
    }
  }
}

export const modifyItem = (itemId, modifications, toastMessage) => {
  return async (dispatch) => {
    try {
      const modifiedItem = (
        await axios.put(`/api/items/${itemId}`, modifications)
      ).data
      dispatch(editItem(modifiedItem))

      if (modifiedItem.updatedAt) {
        toast.success(toastMessage, toastSettings)
        history.push('/singleview', {item: modifiedItem})
      } else {
        toast.warning('Error! =( Try again?', toastSettings)
      }
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
