import store from '../store/store'
import firebase, {auth, database} from './firebase';

export function readAllBoards (userName) {
  firebase.database().ref('users/'+ userName +'/stages').on ('value', res => {
    let stages = [];
    res.forEach ( snap  => {
      const stage = snap.val();
      stages.push (stage);
    });
    store.setState ({
      stages : stages
    }); 
  });

  firebase.database().ref('users/' + userName + '/tasks').on ('value', res => {
    let tasks = [];
    res.forEach ( snap  => {
      const task = snap.val();
      tasks.push (task)
    });
    store.setState ({
      tasks : tasks
    }); 
  });  
   
  firebase.database().ref('users/' + userName + '/boards').on('value', res => {
    let stages = [];
    res.forEach(snap => {
    const stage = snap.val();
      stages.push(stage);
    });
    store.setState({
      boards: stages
    });
  });
}

export const readBoard = () => {
  auth.onAuthStateChanged(user => {
    console.log(user);
    if (user) {
       let usersRef = database.ref('/users');
       let userRef = usersRef.child(user.uid);
      console.log('si')
       store.setState ({
          successLogin : true
       });
      let searchUser = user.email.split("@")[0];
      console.log("envia" , user.email.split("@")[0]);
      readAllBoards(searchUser);
    }
  });
}

export function addBoard (value) {
  let userName = store.getState().userName;
  console.log("useeer", userName);
  let boards = [...store.getState().boards];
  console.log("boards"  , boards)
  let newBoard = {
    name: value,
    id: boards.length + '-' + value
}
firebase.database().ref('users/' + userName + '/boards/' + newBoard.id).set(newBoard);
}

export function  addStage (text) {
  let stages = [...store.getState().stages];
  stages.push (  text )
  console.log("addStage",  store.getState().user.id);
  let userId = store.getState().user.id;
  firebase.database().ref('users/' + userId + '/stages').push (text);
}

export function  addTask (stage, text) {
  console.log ('addTask:', stage + ' - ' +  text);
  let tasks = [...store.getState().tasks];
  console.log("storetask", tasks);
  let userId = store.getState().user.id;
  console.log(userId);
  let newTask = {
    id : store.getState().tasks.length,
    title: text,
    stage : stage
  } 
  firebase.database().ref('users/' + userId +'/tasks/' + newTask.id ).set (newTask);
 }

export function signIn (email, password) {
  auth.signInWithEmailAndPassword(email, password).then (userObj => {
    console.log('user:' ,userObj.email);
    let userName = userObj.email.split("@")[0];
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
     userName : "",
     user: {
        id :'',
        email :  '', 
     }
  })
  console.log(store.getState().successLogin);
}

