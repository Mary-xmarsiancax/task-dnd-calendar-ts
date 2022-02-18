import {combineReducers, createStore} from "redux"
import {composeWithDevTools} from "redux-devtools-extension";
import notesReducer from "./notes-reducer"
import authReducer from "./auth-reducer"

let reducers = combineReducers({
    notesStore: notesReducer,
    authStore: authReducer
})
let store = createStore(reducers, composeWithDevTools())
export default store;