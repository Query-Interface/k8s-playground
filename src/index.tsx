import * as React from "react";
import  ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import store from './app/store';
import App from "./app/App";

const render = (): void => {
   ReactDOM.render(
     <Provider store={store}>
       <App />
     </Provider>,
     document.getElementById('container'),
   );
 };
 
 render();