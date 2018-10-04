import React from 'react';
import ReactDOM from 'react-dom';
import './redux-js/index';
import {store} from "./redux-js/stores/index";
import App from './App';
ReactDOM.render(
     <provider store={store}>
         <App />
     </provider>
         , document.getElementById('root'));
