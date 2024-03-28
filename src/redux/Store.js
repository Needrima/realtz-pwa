import { combineReducers, createStore } from "redux";

import { authReducer } from "./Reducers";

const rootReducer = combineReducers({
  authReducer: authReducer,
});

const Store = createStore(rootReducer);
export default Store;
