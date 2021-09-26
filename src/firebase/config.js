// Setting up firebase Storage and database

import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCOiTu0st9_CZ6jdfa3nhvJCBUUdXuR4zk",
  authDomain: "react-gallery-app-20a89.firebaseapp.com",
  databaseURL: "https://react-gallery-app-20a89-default-rtdb.firebaseio.com",
  projectId: "react-gallery-app-20a89",
  storageBucket: "react-gallery-app-20a89.appspot.com",
  messagingSenderId: "32855758160",
  appId: "1:32855758160:web:db4056a73fbda3d3e5c855",
};

const fireDb = firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export default fireDb.database().ref();

export { projectStorage, projectFirestore, timestamp };
