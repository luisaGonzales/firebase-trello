import store from '../store/store'
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



export function readBoard () {
   firebase.database().ref('stages').on ('value', res => {
      let stages = []
      res.forEach ( snap  => {
         const stage = snap.val();
         stages.push (stage);
      })
      store.setState ({
         stages : stages
      }) 
   });

   firebase.database().ref('tasks').on ('value', res => {
      let tasks = [];
      res.forEach ( snap  => {
          const task = snap.val();
          tasks.push (task)
      })      
      store.setState ({
         tasks : tasks
      }) 
   });   
}

export function  addStage (text) {

   let stages = [...store.getState().stages];
   stages.push (  text )
   /*store.setState ({
      stages : stages
   })  */

   firebase.database().ref('stages').push (text);
}

export function  addTask (stage, text) {
   console.log ('addTask:', stage + ' - ' +  text);

   let tasks = [...store.getState().tasks];

   let newTask = {
      id : store.getState().tasks.length,
      title: text,
      stage : stage
   } 

   firebase.database().ref('tasks/' + newTask.id).set (newTask);
   /*
   store.setState ({
      tasks : tasks
   })  */
}