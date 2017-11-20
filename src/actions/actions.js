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
    let boards = [];
    res.forEach(snap => {
      let board = snap.val();
      boards.push(board);
    });
    console.log("boards ",boards)
    store.setState({
      boards: boards
    });
  });
  console.log("store" ,store.getState().boards);

}

export const readBoard = () => {
  auth.onAuthStateChanged(user => {
    if (user) {
      let usersRef = database.ref('/users');
      let userRef = usersRef.child(user.uid);
      store.setState ({
        successLogin : true
      });
      let searchUser = user.email.split("@")[0];
      console.log("envia" , user.email.split("@")[0]);
      readAllBoards(searchUser);
    }
  });
}

export function  addStage (text) {
  let stages = [...store.getState().stages];
  let userId = store.getState().user.id;
  stages.push(text);
  firebase.database().ref('users/' + userId + '/stages').push (text);
}

export function addBoard (value) {
  let userName = store.getState().user.id;
  let boards = [...store.getState().boards];
  console.log("user", userName);
  console.log("boa" , boards);
  let newBoard = {
    name: value,
    id: boards.length + '-' + value, 

  }
  firebase.database().ref('users/' + userName + '/boards/' + newBoard.id).set(newBoard);
}



export function  addTask (stage, text) {
  let tasks = [...store.getState().tasks];
  let userId = store.getState().user.id;
  let newTask = {
    id : store.getState().tasks.length,
    title: text,
    stage : stage
  } 
  firebase.database().ref('users/' + userId +'/tasks/' + newTask.id ).set(newTask);
}

export function signIn (email, password) {
  auth.signInWithEmailAndPassword(email, password).then (userObj => {
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
      });
    });
  });
}

export function signUp (firstname, lastname, email, password) {
  console.log ('signUp' , firstname, lastname, email, password);
  auth.createUserWithEmailAndPassword (email, password).then ( user => {
    let newuser = {firstname, lastname, email, password}
    let userName = email.split("@")[0];
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
      });
    });
  });
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

