import store from '../store/store'
import firebase, {auth, database} from './firebase';

export function readBoard(user) {
  firebase.database().ref(user + '/boards').on('value', res => {
      let stages = [];
      res.forEach(snap => {
          const stage = snap.val();
          stages.push(stage);
      })
      console.log(stages);
      store.setState({
          boards: stages
      })
  });
}

export const probando = () => {
  firebase.auth().onAuthStateChanged(usuario => {
      if (usuario) {
          console.log('si');
          firebase.database().ref('users/' + usuario.uid).once('value').then(res => {
              const fullUserInfo = res.val();
              store.setState({
                  user: {
                      id: 'users/' + usuario.uid,
                      name: fullUserInfo.firstName,
                      lastName: fullUserInfo.lastName
                  }
              })
              console.log('full info ', fullUserInfo);

          })
          readBoard('users/' + usuario.uid);
      } else {
          console.log('no')
      }
  });
  auth.onAuthStateChanged(user => {
    if (user) {
       console.log('user', user);
  
       let usersRef = database.ref('/users');
       let userRef = usersRef.child(user.uid).toJSON();
       store.setState ( {
          successLogin : true
       });
    }
  });
}

export function addBoard (value) {
  let user = store.getState().user;
  let userName = user.email.split("@")[0];
  console.log("useeer", user);
  let boards = [...store.getState().boards];
  console.log("board", boards);
  let newBoard = {
    name: value,
    id: boards.length + '-' + value
}
firebase.database().ref('users/' + userName + '/boards/' + newBoard.id).set(newBoard);
}

export function  addStage (text) {
  let stages = [...store.getState().stages];
  stages.push (  text ); 
  let user = store.getState().user;
  /*store.setState ({
     stages : stages
  })  */
  let userName = user.email.split("@")[0];
  firebase.database().ref('users/' + userName + '/stages').set(text);
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
    let userName = email.split("@")[0];
     database.ref ('users/' + userName).once ('value').then ( res => {
        const fullUserInfo = res.val(); 
        console.log ('full info ', fullUserInfo);
        store.setState ( {
           user: {
              id : userName,
              email :  fullUserInfo.email,
              firstname : fullUserInfo.firstname,
              lastname : fullUserInfo.lastname,           
           }
        })
     })
  })
}



export function signUp (firstname, lastname, email, password) {
   console.log ('signUp' , firstname, lastname, email, password);

   auth.createUserWithEmailAndPassword (email, password).then ( user => {
      let newuser = {
        firstname, lastname, email, password
      }
      let userName = email.split("@")[0];
      console.log(userName)
      database.ref ('users/' + userName).set (newuser);  
      // let enviar = {lastname};
      // database.ref ('users/' + user.uid + '/stages').set(enviar);

     // database.ref ('users/' + user.uid + '/options').update ( 'option1, option2, option3...');   
     //  database.ref ('users/').push (newuser);   
      
      database.ref ('users/' + userName).once ('value').then ( res => {
         const fullUserInfo = res.val(); 

         console.log ('full info ', fullUserInfo);
         store.setState ( {
            user: {
               id : userName,
               email :  fullUserInfo.email,
               firstname :  fullUserInfo.firstname,
               lastname :  fullUserInfo.lastname,              
            }
         })
         console.log(store.getState().user);
      })
   })
}

export function signOut () {
  auth.signOut();
  store.setState ( {
     successLogin : false,
     boards : [],
     stages : [],
     tasks : [],
     user: {
        id :'',
        email :  '', 
     }
  })
  console.log(store.getState().successLogin);
}

