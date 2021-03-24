import axios from 'axios'
import history from '../history'
import {storage} from '../../firebase/firebase'

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
      // const formData = new FormData()

      // const imageArr = async (photos) => {
      //   if (photos) {
      //     let arr = []

      //     for (let i = 0; i < photos.length; i++) {
      //       // encode the file using the FileReader API
      //       const reader = new FileReader()
      //       reader.onloadend = () => {
      //         arr.push({
      // imageName: `${photos[i].name}${Math.floor(
      //   Math.random() * 100000
      // )}`,
      //           fileData: reader.result,
      //         })
      //       }
      //       reader.readAsDataURL(photos[i])
      //     }
      //     /* creating base64 data from uploaded file
      //   {
      //     formData.append(`${item.uploadPhoto[i].name}`, item.uploadPhoto[i])
      //   }
      //   */
      //     return arr
      //   }
      // }

      let fileInfo = {
        itemType: item.itemType,
        itemListName: item.itemListName,
        description: item.description,
        itemCondition: item.itemCondition,
        userId: item.user.id,
        imageArr: [],
      }

      if (item.uploadPhoto) {
        item.uploadPhoto.forEach((element) => {
          const random = `/images/${element.name}${Math.floor(
            Math.random() * 100000
          )}`

          storage
            .ref(random)
            .put(element)
            .then((response) => {
              try {
                console.log(`Added file: ${element.name} to cloud`)
                storage
                  .ref(random)
                  .getDownloadURL()
                  .then((url) => {
                    console.log(url)
                    console.log(random)
                    fileInfo.imageArr.push({cloudRef: random, downloadUrl: url})
                  })
              } catch (error) {
                console.log('failed')
              }
            })
        })
      }

      /*
      formData.append('itemType', item.itemType)
      formData.append('itemListName', item.itemListName)
      formData.append('description', item.description)
      formData.append('itemCondition', item.itemCondition)
      formData.append('userId', item.user.id)
      */

      //append file data from the form - if item.uploadPhoto IS NOT null

      // if (item.uploadPhoto) {

      // }

      console.log('fileInfo', fileInfo)

      // vv test vv  below axios call is for testing purpose - visualize formData vv //
      axios
        .post('https://httpbin.org/anything', fileInfo)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => console.log(err))

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

const initialState = {}
export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_NEW_ITEM:
      return action.item
    default:
      return state
  }
}
