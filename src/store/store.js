import createStore from 'redux-zero'

const initialState = {
   stages: [ ],
   tasks: [ ], 
   successLogin : false, 
   user : {
       id : null, 
       email : null,
       password : null, 
       firstname : null,
       lastname : null, 
       stages : [],
       tasks : []
   }
};

const store = createStore (initialState);
export default store;   