import {DataFormType} from "../components/registration/registration-form";
import {AuthData, Note, UserResponseData} from "./api-types";
import {AxiosResponse} from "axios";

const axios = require("axios");


const instance = axios.create({
    baseURL: "http://localhost:8000/api"
})

export const setAuthorizationHeader = (token:string | null) => {
    if (token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        tokenDelete()
    }
}
const tokenDelete = () => {
    localStorage.removeItem("token")
    delete instance.defaults.headers.common['Authorization'];
}
setAuthorizationHeader(localStorage.getItem("token") )


export const usersApi = {
    usersRegistration(data: DataFormType):Promise<AxiosResponse<UserResponseData>> {
        return instance.post(`/users`, data)
    },
    usersLogin(data: DataFormType):Promise<AxiosResponse<UserResponseData>> {
        return instance.post(`/users/login`, data)
    },
    usersLogout() {
        tokenDelete()
    },
    getCurrentUser():Promise<AxiosResponse<AuthData>> {
        return instance.get(`/users/current`)
    }
}

export const notesApi = {
    getNotes(): Promise<AxiosResponse<Array<Note>>> {
        return instance.get(`/notes`)//:Array<ResponsesNotesGet>
    },
    setNotes(text:string): Promise<Note> {
        return instance.post(`/notes`, {text: text})
    },
    updateNotes(text: string, id: number): Promise<AxiosResponse<Note>> {
        return instance.put(`/notes`, {text: text, id: id})
    },
    deleteNotes(id: number):Promise<void> {
        return instance.delete(`/notes?id=${id}`)
    }
}