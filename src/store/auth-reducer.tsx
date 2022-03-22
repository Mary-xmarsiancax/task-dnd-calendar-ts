import {AuthData, UserResponseData} from "../servises/api-types";
import {DataFormType} from "../components/registration/registration-form";
import {setAuthorizationHeader, usersApi} from "../servises/api";
import {InferActionsTypes} from "./redux-store";
import {AxiosResponse} from "axios";

export const actions = {
    setUsersData: (data: AuthData) => ({type: "SET_REGISTRATION_DATA", data} as const),
    setRegistrationErrorsText: (text: string) => ({type: "SET_REGISTRATION_ERRORS_TEXT", text} as const),
    setLoading: (loadingStatus: boolean) => ({type: "SET_LOADING", loadingStatus} as const),
}
type AuthActionsType = InferActionsTypes<typeof actions>

type Errors = {
    registrationTextError: string
}
type IsLoading = {
    isLoading: boolean
}

let initialState: AuthData & Errors & IsLoading = {
    id: null,
    username: "",
    registrationTextError: "",
    isLoading: false
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
        case "SET_LOADING": {
            let copyState = {...state}
            copyState.isLoading = action.loadingStatus;
            return copyState
        }
        default:
            return state;
    }

}

//thunks
export const setUsersData = (data: DataFormType, usersApiMethod: (data: DataFormType) => Promise<AxiosResponse<UserResponseData>>,
                             todoType: string) => (dispatch: any) => {
    dispatch(actions.setLoading(true))
    usersApiMethod(data)
        .then(response => {
                dispatch(actions.setLoading(false))
                let {id, username, token} = response.data;
                dispatch(actions.setUsersData({id, username}))
                localStorage.setItem("token", token)
                setAuthorizationHeader(token)
            }, error => {
                dispatch(actions.setLoading(false))
                if (todoType === "registerType") {
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
    dispatch(actions.setLoading(true))
    usersApi.getCurrentUser()
        .then(response => {
            dispatch(actions.setLoading(false))
            let {id, username} = response.data;
            dispatch(actions.setUsersData({id, username}))
        }, err => {
            setAuthorizationHeader("");
            dispatch(actions.setLoading(false))
            dispatch(actions.setUsersData(
                {
                    id: null,
                    username: ""
                })
            )
        })
}

export default authReducer;