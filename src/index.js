import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store/store';
import {Provider} from 'redux-zero/react'

const Index = () => {
    return(
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
