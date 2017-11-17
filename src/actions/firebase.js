import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCHifooBzhpZ2iLd4glpXHRqH-25oV2eGc",
    authDomain: "trello-list-firebase.firebaseapp.com",
    databaseURL: "https://trello-list-firebase.firebaseio.com",
    projectId: "trello-list-firebase",
    storageBucket: "trello-list-firebase.appspot.com",
    messagingSenderId: "643360796421"
  };
  firebase.initializeApp(config);

  export default firebase;
  
  export const database = firebase.database();
  export const auth = firebase.auth();
  export const storage = firebase.storage();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  