import {AuthData} from "../servises/api-types";
import {DataFormType} from "../components/registration/registration-form";
import {setAuthorizationHeader, usersApi} from "../servises/api";
import {InferActionsTypes} from "./redux-store";
import {useNavigate} from "react-router-dom";

export const actions = {
    setRegistrationData: (data: AuthData) => ({type: "SET_REGISTRATION_DATA", data} as const),
    setRegistrationErrorsText: (text: string) => ({type: "SET_REGISTRATION_ERRORS_TEXT", text} as const),
    setLoginErrorsText: (text: string) => ({type: "SET_LOGIN_ERRORS_TEXT", text} as const)
}
type ActionsType = InferActionsTypes<typeof actions>

type Errors = {
    loginTextError: string
    registrationTextError: string
}

let initialState: AuthData & Errors = {
    id: null,
    username: "",
    loginTextError: "",
    registrationTextError: ""
}


const authReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case "SET_REGISTRATION_DATA": {
            let copyState = {...state}
            let {id, username} = action.data
            copyState.id = id
            copyState.username = username
            return copyState
        }
        case "SET_REGISTRATION_ERRORS_TEXT": {
            let copyState = {...state}
            copyState.registrationTextError = action.text
            return copyState
        }
        case "SET_LOGIN_ERRORS_TEXT": {
            let copyState = {...state}
            copyState.loginTextError = action.text
            return copyState
        }
        default:
            return state;
    }

}

//thunks
export const setUsersData = (data: DataFormType) => (dispatch: any) => {
    usersApi.usersRegistration(data)
        .then(response => {
                let {id, username, token} = response.data;
                dispatch(actions.setRegistrationData({id, username}))
                localStorage.setItem("token", token)
                setAuthorizationHeader(token)
                 // navigate("/tasksContent", {replace: true})
            }, error => {
                let registrationTextError = error.response.data.errors[0]
                dispatch(actions.setRegistrationErrorsText(registrationTextError))
            }
        )
}
export const getCurrentUsersData = () => (dispatch: any) => {
    usersApi.getCurrentUser()
        .then(response => {
            let {id, username} = response.data;
            dispatch(actions.setRegistrationData({id, username}))
        }, err => {
            setAuthorizationHeader("");
             // navigate('/login', {replace: true})
            dispatch(actions.setRegistrationData(
                {
                    id: null,
                    username: ""
                })
            )
        })
}

export default authReducer;