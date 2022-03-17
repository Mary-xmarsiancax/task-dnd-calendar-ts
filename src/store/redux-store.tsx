import {applyMiddleware, combineReducers, compose, createStore} from "redux"
import notesReducer from "./notes-reducer"
import authReducer from "./auth-reducer"
import thunk from 'redux-thunk'

let rootReducer = combineReducers({
    notesStore: notesReducer,
    authStore: authReducer,
})

type RootReducer = typeof rootReducer;
export type AppState = ReturnType<RootReducer>

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export default store;

type PropertiesType<T> = T extends { [key: string]: infer u } ? u : never
export type InferActionsTypes<T extends { [key: string]: (...arg: any[]) => any }> = ReturnType<PropertiesType<T>>
