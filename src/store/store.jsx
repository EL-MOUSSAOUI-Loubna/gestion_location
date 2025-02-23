import reducer from "./reducer";
import {thunk} from 'redux-thunk';
import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import { loadState, saveState } from './localStorage';

const loadedState = loadState();

const store = createStore(
    reducer, 
    loadedState,
    applyMiddleware(thunk), 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
console.log("Loaded Redux State from LocalStorage:", loadedState);
store.subscribe(() => {
    const currentState = store.getState();
    saveState(currentState);
  });

export default store;
