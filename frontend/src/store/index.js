import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose,
  } from 'redux';
  import storeReducer from '../reducers/storeReducer'; 
  import cartReducer from '../reducers/cartReducer';
  import thunk from 'redux-thunk';
  
  const reducer = combineReducers({
    storeState: storeReducer, 
    cartState: cartReducer,   
  });
  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)),
  );
  
  export default store;
  