import createStore from 'redux-zero'

const initialState = {
//    stages: [ ],
//    tasks: [ ],
   boards : [], 
   successLogin : false, 
   boardSelect : -1, 
   user : {
       id : null, 
       email : null,
       password : null, 
       firstname : null,
       lastname : null
   }
};

const store = createStore (initialState);
export default store;   