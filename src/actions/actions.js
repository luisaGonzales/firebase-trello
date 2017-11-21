import store from '../store/store'
import firebase, {auth, database} from './firebase';

export function signUp (firstname, lastname, email, password) {
  console.log ('signUp' , firstname, lastname, email, password);
  auth.createUserWithEmailAndPassword (email, password).then ( user => {
    let newuser = {firstname, lastname, email, password}
    database.ref ('users/' + user.uid).set (newuser);  
    database.ref ('users/' + user.uid).once ('value').then ( res => {
      const fullUserInfo = res.val();
      console.log ('full info ', fullUserInfo);
      store.setState ( {
        user: {
          id : user.uid,
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
     user: {
        id :'',
        email :  '', 
     }
  });
  console.log("successLogin",store.getState().successLogin);
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
          password : fullUserInfo.password           
        }
      });
      // readBoard();
    });
  });
}

auth.onAuthStateChanged(user => {
  if (user) {
    let usersRef = database.ref('/users');
    let userRef = usersRef.child(user.uid);
    store.setState ({
      successLogin : true
    });
  }
});

export function addBoard (value) {
  let boards = [...store.getState().boards];
  let newId = boards.length;
  if (!newId){
    newId = 0
  }
  console.log("boards" , boards);
  let newBoard = {
    id : newId, 
    name: value 
  }
  firebase.database().ref('users/' + store.getState().user.id + '/boards/' + newBoard.id).set(newBoard);
}

export function  addStage (selected, text) {
  let newBoards = [...store.getState().boards];
  let newId = newBoards[selected].lists.length;
  if(!newId){
    newId = 0;
  }
  let newStage = {
    id : newBoards[selected].lists.length, 
    name : text,
    tasks : []
  }
  firebase.database().ref('users/' + store.getState().user.id + '/boards/' + newBoards[selected].id).set(newStage);
}

export function  addTask (selected, index, text) {
  let newBoards = [...store.getState().boards];
  firebase.database().ref('users/' + store.getState().user.id +'/boards/' + newBoards[selected].id + '/stages/' + newBoards[selected].lists[index].id + '/tasks/'  ).push(text);
}

export const viewBoard = (index) => {
  console.log("index", index);
  store.setState({
    boardSelect : index
  });
  console.log("storeIndex", store.getState().boardSelect);
}

export function readBoards(){
  let newBoards = [];
  firebase.database().ref('users/' + store.getState().user.id +'/boards/').on('value', res => {
    res.forEach( snap => {
      const board = snap.val();
      let newStages = [];
        firebase.database().ref('users/' + store.getState().user.id +'/boards/' + board.id + '/stages/').on('value', res => {
          res.forEach( snap  => {
            const stage = snap.val();
            let newTasks =[];
            firebase.database().ref('users/' + store.getState().user.id + '/boards/' + board.id + '/stages/' + stage.id + '/tasks/').on('value',res => {
              res.forEach(snap => {
                const task = snap.val();
                newTasks.push(task);
              });
            });
            newStages.push({
              id : stage.id,
              name : stage.name,
              tasks : newTasks
            });
          });
        });        
      newBoards.push({
        id : board.id,
        name : board.name,
        stages : newStages
      });   
    }); 
    store.setState({
      boards:newBoards,
      addBoard:false
    }); 
    newBoards = [];
  });
}

// export const readBoard = () => {
//   auth.onAuthStateChanged(user => {
//     if (user) {
//       let usersRef = database.ref('/users');
//       let userRef = usersRef.child(user.uid);
//       store.setState ({
//         successLogin : true
//       });
//       readAllBoards(userRef);
//     }
//   });
// }

// export function addBoard (value) {
//   let userName = store.getState().user.id;
//   let boards = [...store.getState().boards];
//   console.log("user", userName);
//   console.log("boa" , boards);
//   let newBoard = {
//     name: value,
//     id: boards.length + '-' + value, 
//   }
//   firebase.database().ref('users/' + userName + '/boards/' + newBoard.id).set(newBoard);
// }

// export function  addStage (text) {
//   let stages = [...store.getState().stages];
//   let userId = store.getState().user.id;
//   let boards = store.getState().boards;
//   console.log("user", userId);
//   let newStage = {
//     id : boards.length + '-' + text, 
//     name : text
//   }
//   stages.push(text);
//   firebase.database().ref('users/' + userId + '/stages').push (text);
// }

// export function  addTask (stage, text) {
//   let tasks = [...store.getState().tasks];
//   let userId = store.getState().user.id;
//   let newTask = {
//     id : store.getState().tasks.length,
//     title: text,
//     stage : stage
//   } 
//   firebase.database().ref('users/' + userId +'/tasks/' + newTask.id ).set(newTask);
// }

// export function readAllBoards (userName) {
//   firebase.database().ref('users/'+ userName +'/stages').on ('value', res => {
//     let stages = [];
//     res.forEach ( snap  => {
//       const stage = snap.val();
//       stages.push (stage);
//     });
//     store.setState ({
//       stages : stages
//     }); 
//   });

//   firebase.database().ref('users/' + userName + '/tasks').on ('value', res => {
//     let tasks = [];
//     res.forEach ( snap  => {
//       const task = snap.val();
//       tasks.push (task)
//     });
//     store.setState ({
//       tasks : tasks
//     }); 
//   });  
   
//   firebase.database().ref('users/' + userName + '/boards').on('value', res => {
//     let boards = [];
//     res.forEach(snap => {
//       let board = snap.val();
//       boards.push(board);
//     });
//     console.log("boards ",boards)
//     store.setState({
//       boards: boards
//     });
//   });
//   console.log("store" ,store.getState().boards);
// }