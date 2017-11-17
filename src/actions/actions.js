import store from '../store/store'
import firebase, {auth, database} from './firebase';

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

export function signIn (email, password) {
  auth.signInWithEmailAndPassword(email, password).then (userObj => {

     database.ref ('users/' + userObj.uid).once ('value').then ( res => {
        const fullUserInfo = res.val(); 
        console.log ('full info ', fullUserInfo);
        store.setState ( {
           user: {
              id : userObj.uid,
              email :  fullUserInfo.email,
              firstname : fullUserInfo.firstname,
              lastname : fullUserInfo.lastname, 
              stages : fullUserInfo.stages,
              tasks : fullUserInfo.tasks            
           }
        })
     })
  })
}


auth.onAuthStateChanged(user => {
  if (user) {
     console.log('user', user);
     let usersRef = database.ref('/users');
     let userRef = usersRef.child(user.uid);
     store.setState ( {
        successLogin : true
     })
  }
});