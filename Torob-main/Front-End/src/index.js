import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.css'
import Reducer from './components/reducers/reducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(Reducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

