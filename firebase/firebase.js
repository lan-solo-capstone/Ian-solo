import firebase from 'firebase/app'
import 'firebase/storage'

var firebaseConfig = {
  apiKey: 'AIzaSyD96SLoxxLXigp6Fen5oiAJG0G_G9UnDTs',
  authDomain: 'freeshare-7b345.firebaseapp.com',
  projectId: 'freeshare-7b345',
  storageBucket: 'freeshare-7b345.appspot.com',
  messagingSenderId: '509806577990',
  appId: '1:509806577990:web:f60dc2f3bb66e12d05fd47',
}

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

// export {storage, firebase as default}
export {storage, firebase as default}
