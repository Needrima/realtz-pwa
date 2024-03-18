import { combineReducers, createStore } from 'redux';

import {authReducer} from './Reducers';

const rootReducer = combineReducers({
    authReducer: authReducer,
});

const store = createStore(rootReducer);
export default store;