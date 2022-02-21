import {combineReducers, createStore, applyMiddleware} from "redux"
import {composeWithDevTools} from "redux-devtools-extension";
import notesReducer from "./notes-reducer"
import authReducer from "./auth-reducer"
import thunk from 'redux-thunk'

let rootReducer = combineReducers({
    notesStore: notesReducer,
    authStore: authReducer
})

type RootReducer = typeof rootReducer;
export type AppState = ReturnType<RootReducer>

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
export default store;

type PropertiesType<T> = T extends { [key: string]: infer u } ? u : never
export type InferActionsTypes<T extends {[key: string]:(...arg:any[])=>any}>=ReturnType<PropertiesType<T>>