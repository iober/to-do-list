import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyDBHh5v1sz7LtKNRJrYxXNO0ZuYb6-1Bk4",
  authDomain: "to-do-ihc.firebaseapp.com",
  projectId: "to-do-ihc",
  storageBucket: "to-do-ihc.appspot.com",
  messagingSenderId: "357588058888",
  appId: "1:357588058888:web:8d474edeb545fc2bca22bd"
}

export default firebase.initializeApp(firebaseConfig)

window.firebase = firebase
