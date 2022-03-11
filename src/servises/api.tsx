import {AxiosResponse} from "axios";
import {DataFormType} from "../components/registration/registration-form";
import {AuthData, Note, UserResponseData} from "./api-types";

const axios = require("axios");


const instance = axios.create({
    baseURL: "http://localhost:8000/api"
})

export const setAuthorizationHeader = (token: string | null) => {
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
setAuthorizationHeader(localStorage.getItem("token"))


export const usersApi = {
    usersRegistration(data: DataFormType): Promise<AxiosResponse<UserResponseData>> {
        return instance.post(`/users`, data)
    },
    usersLogin(data: DataFormType): Promise<AxiosResponse<UserResponseData>> {
        return instance.post(`/users/login`, data)
    },
    usersLogout() {
        tokenDelete()
    },
    getCurrentUser(): Promise<AxiosResponse<AuthData>> {
        return instance.get(`/users/current`)
    }
}

export const notesApi = {
    getNotes(): Promise<AxiosResponse<Array<Note>>> {
        return instance.get(`/notes`)//:Array<ResponsesNotesGet>
    },
    setNote(text: string, droppableId: string): Promise<Note> {
        return instance.post(`/notes`, {text: text, label: droppableId})
    },
    updateNote(id: number, droppableId: string): Promise<AxiosResponse<Note>> {
        return instance.put(`/notes`, {id: id, label: droppableId})
        //, color: index.toString()
    },
    deleteNote(id: number): Promise<void> {
        return instance.delete(`/notes?id=${id}`)
    }
}
