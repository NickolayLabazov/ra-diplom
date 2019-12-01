import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose,
  } from 'redux';
  import storeReducer from '../reducers/storeReducer'; 
  import thunk from 'redux-thunk';
  
  const reducer = combineReducers({
    storeState: storeReducer,    
  });
  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)),
  );
  
  export default store;
  