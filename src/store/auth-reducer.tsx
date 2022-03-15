import {AuthData, UserResponseData} from "../servises/api-types";
import {DataFormType} from "../components/registration/registration-form";
import {setAuthorizationHeader, usersApi} from "../servises/api";
import {InferActionsTypes} from "./redux-store";
import {AxiosResponse} from "axios";

export const actions = {
    setUsersData: (data: AuthData) => ({type: "SET_REGISTRATION_DATA", data} as const),
    setRegistrationErrorsText: (text: string) => ({type: "SET_REGISTRATION_ERRORS_TEXT", text} as const),
}
type AuthActionsType = InferActionsTypes<typeof actions>

type Errors = {
    registrationTextError: string
}

let initialState: AuthData & Errors = {
    id: null,
    username: "",
    registrationTextError: ""
}

const authReducer = (state = initialState, action: AuthActionsType) => {
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
        default:
            return state;
    }

}

//thunks
export const setUsersData = (data: DataFormType, usersApiMethod: (data: DataFormType) => Promise<AxiosResponse<UserResponseData>>,
                             todoType:string) => (dispatch: any) => {
    usersApiMethod(data)
        .then(response => {
                let {id, username, token} = response.data;
                dispatch(actions.setUsersData({id, username}))
                localStorage.setItem("token", token)
                setAuthorizationHeader(token)
            }, error => {
                if (todoType === "registerType"){
                    let registrationTextError = error.response.data.errors[0]
                    dispatch(actions.setRegistrationErrorsText(registrationTextError))
                } else {
                    let registrationTextError = error.response.data.errors.error[0]
                    dispatch(actions.setRegistrationErrorsText(registrationTextError))
                }

            }
        )
}
export const getCurrentUsersData = () => (dispatch: any) => {
    usersApi.getCurrentUser()
        .then(response => {
            let {id, username} = response.data;
            dispatch(actions.setUsersData({id, username}))
        }, err => {
            setAuthorizationHeader("");
            // navigate('/login', {replace: true})
            dispatch(actions.setUsersData(
                {
                    id: null,
                    username: ""
                })
            )
        })
}

export default authReducer;