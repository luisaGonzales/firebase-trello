import store from '../store/store'
import firebase, {auth, database} from './firebase';

export function signUp (firstname, lastname, email, password) {
  console.log ('signUp' , firstname, lastname, email, password);
     auth.createUserWithEmailAndPassword (email, password).then ( user => {
        let newuser = {
          firstname, lastname, email, password
        }
        database.ref ('users/' + user.uid).set (newuser);           
        database.ref ('users/' + user.uid).once ('value').then ( res => {
           const fullUserInfo = res.val(); 
  
           console.log ('full info ', fullUserInfo);
           store.setState ( {
              user: {
                 id : user.uid,
                 email :  fullUserInfo.email,
                 firstname : fullUserInfo.firstname,
                 lastname : fullUserInfo.lastname,
                 password : fullUserInfo.password              
              }
           })
        })
     })
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
  console.log("login", selected);
  console.log("text", text);
  let newBoards = [...store.getState().boards];
  let newId = newBoards[selected].stages;
  console.log("stagesa", newBoards[selected].stages);

  if(!newId) {
    newId = 0;
  } else if (newId == undefined) {
    newId = 0;
  } else {
    newId = newBoards[selected].stages.length
  }

  let newStage = {
    id : newId,
    name : text
  }
  let user = store.getState().user;
  console.log("user", user);
  console.log("newboard", newBoards[selected].id );
  firebase.database().ref('users/' + user.id + '/boards/' + newBoards[selected].id + '/stages/' + newStage.id ).set(newStage);
}

export function  addTask (selected, index, text) {
  console.log("selectedtask", selected);
  console.log("storeselect", store.getState().boardSelect);
  console.log("index task", index);
  console.log("text task", text);
  let newBoards = [...store.getState().boards];
  let newId = newBoards[selected].stages[index].tasks;
  let user = store.getState().user; 
  if(!newId) {
    newId = 0;
  } else if (newId == undefined) {
    newId = 0;
  } else {
    newId = newBoards[selected].stages[index].tasks.length
  }
  let newTask = {
    id : newId,
    name : text
  }
  if(newBoards[selected]){
    console.log("taskdirect", 'users/' + user.id +'/boards/' + newBoards[selected].id + '/stages/' + newBoards[selected].stages[index].id + '/tasks/' );
  }
  firebase.database().ref('users/' + user.id +'/boards/' + newBoards[selected].id + '/stages/' + newBoards[selected].stages[index].id + '/tasks/' + newTask.id ).set(newTask);
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
