import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import Gallery from './components/Gallery'
import { Provider } from 'react-redux'; 
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/reducer';
import createSagaMiddleware from 'redux-saga';
import {loadSomeImages, watchForLoadImages} from './watchForLoadImages';

const store = createStore(
  reducer,
  applyMiddleware(createSagaMiddleware(watchForLoadImages))
);

ReactDOM.render(
	 <Provider store={store}>
    <Gallery />
  </Provider>, document.getElementById('root')
);

