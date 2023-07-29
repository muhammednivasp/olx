import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firebase'
// import 'firebase/firestore'
import 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyAw59CLTmQN78x6SiJLM36YPpDSnjVPcpE",
  authDomain: "olxcloned.firebaseapp.com",
  projectId: "olxcloned",
  storageBucket: "olxcloned.appspot.com",
  messagingSenderId: "522403532313",
  appId: "1:522403532313:web:17731abcd8e77e2b58e488",
  measurementId: "G-F4MYCRKWYN"
};



export default firebase.initializeApp(firebaseConfig)