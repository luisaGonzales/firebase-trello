import store from '../store/store'
import firebase, {auth, database} from './firebase';

export function signUp (firstname, lastname, email, password) {
  console.log ('signUp' , firstname, lastname, email, password);
  auth.createUserWithEmailAndPassword (email, password);
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
  auth.signInWithEmailAndPassword(email, password);
}

auth.onAuthStateChanged(user => {
  if (user) {
    let usersRef = database.ref('/users');
    let userRef = usersRef.child(user.uid);
    
    database.ref ('users/' + user.uid).once ('value').then ( res => {
      const fullUserInfo = res.val(); 
      console.log ('full info ', fullUserInfo);
      store.setState ( {
        successLogin : true,
        user: {
          id : user.uid,
          email :  fullUserInfo.email,
          firstname : fullUserInfo.firstname,
          lastname : fullUserInfo.lastname,
          password : fullUserInfo.password           
        }
      });
      console.log("SIuser", store.getState().user);
      readBoard();
    });
   
    console.log("ruta", 'users/'+ user.uid +'/boards/');

    firebase.database().ref('users/'+ user.uid +'/boards/').on('value', res => {
      let boards = [];
      res.forEach ( snap  => {
        let board = snap.val();
        board.id = snap.key
        boards.push (board);
      });
      console.log("newboard", boards);
      store.setState ({
        boards : boards
      }); 

    });
  }
});

export function addBoard (value) {
  console.log("val", value);
  let boards = [...store.getState().boards];
  let newId = boards.length;
  if (!newId){
    newId = 0
  }
  console.log("add-boards" , boards);
  let newBoard = {
    id : newId, 
    name: value 
  }
  firebase.database().ref('users/' + store.getState().user.id + '/boards/' + newBoard.id).set(newBoard);
  console.log("storeBoards", store.getState().boards);
}

export function  addStage (selected, text) {
  let newBoards = [...store.getState().boards];
  let newId = newBoards[selected].stages.length;
  if(!newId){
    newId = 0;
  }
  let newStage = {
    id : newBoards[selected].stages.length, 
    name : text,
    tasks : []
  }
  firebase.database().ref('users/' + store.getState().user.id + '/boards/' + newBoards[selected].id).set(newStage);
}

export function  addTask (selected, index, text) {
  let newBoards = [...store.getState().boards];
  firebase.database().ref('users/' + store.getState().user.id +'/boards/' + newBoards[selected].id + '/stages/' + newBoards[selected].stages[index].id + '/tasks/'  ).push(text);
}

export const viewBoard = (index) => {
  console.log("index", index);
  store.setState({
    boardSelect : index
  });
  console.log("storeIndex", store.getState().boardSelect);
}

export function readBoard(){

  // let newBoards = [];
  // console.log("readSTORE", store.getState().user.id);
  // firebase.database().ref('users/' + store.getState().user.id +'/boards').on('value', res => {
  //   console.log("read", res);
  //   res.forEach( snap => {
  //     const board = snap.val();
  //     console.log("boardsnap",board);
  //     let newStages = [];
  //       firebase.database().ref('users/' + store.getState().user.id +'/boards/' + board.id + '/stages/').on('value', res => {
  //         res.forEach( snap  => {
  //           const stage = snap.val();
  //           let newTasks =[];
  //           firebase.database().ref('users/' + store.getState().user.id + '/boards/' + board.id + '/stages/' + stage.id + '/tasks/').on ('value',res => {
  //             res.forEach(snap => {
  //               const task = snap.val();
  //               newTasks.push(task);
  //             });
  //           });
  //           newStages.push({
  //             id : stage.id,
  //             name : stage.name,
  //             tasks : newTasks
  //           });
  //         });
  //       });        
  //     newBoards.push({
  //       id : board.id,
  //       name : board.name,
  //       stages : newStages
  //     });   
  //   }); 
  //   console.log("newboards", newBoards)
  //   store.setState({
  //     boards : newBoards,
  //   }); 
  //   console.log("store", store.getState().boards);
  // });
  // newBoards = [];
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
  // firebase.database().ref('users/'+ userName +'/stages').on ('value', res => {
  //   let stages = [];
  //   res.forEach ( snap  => {
  //     const stage = snap.val();
  //     stages.push (stage);
  //   });
  //   store.setState ({
  //     stages : stages
  //   }); 
  // });

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