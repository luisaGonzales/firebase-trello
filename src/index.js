import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store/store';
import {Provider} from 'redux-zero/react';
import {readBoard} from './actions/actions'

const Index = () => {
    return(
        <Provider store={store}>
            <App />
        </Provider>
    );
}
readBoard();

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
