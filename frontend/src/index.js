// Base imports
import React from 'react';

// Routing imports
import ReactDOM from 'react-dom';
import BaseRouter from './routes.js';
import { BrowserRouter as Router} from 'react-router-dom';

// Redux imports
import reducer from './store/reducers/reducer';
import { createStore , compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk' 

// Import css to remove margin
import "./index.css";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhances(
		applyMiddleware(thunk)
));
 
const app = (
	<Provider store={store}>
		<Router>
	  		<BaseRouter />
	  	</Router>
	</Provider>);

ReactDOM.render(
  app, document.getElementById('root')
);