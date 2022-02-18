import {DataFormType} from "../components/registration/registration-form";
import {Current, Note, UserResponse} from "./api-types";

const axios = require("axios");


const instance = axios.create({
    baseURL: "http://localhost:8000/api"
})

export const usersApi = {
    usersRegistration(data: DataFormType):Promise<UserResponse> {
        return instance.post(`/users`, data)
    },
    usersLogin(data: DataFormType):Promise<UserResponse> {
        return instance.post(`/users/login`, data)
    },
    usersLogout() {
        // tokenDelete()
    },
    getCurrentUser():Promise<Current> {
        return instance.get(`/users/current`)
    }
}

export const notesApi = {
    getNotes(): Promise<Array<Note>> {
        return instance.get(`/notes`)//:Array<ResponsesNotesGet>
    },
    setNotes(): Promise<Note> {
        return instance.post(`/notes`, {text: ""})
    },
    updateNotes(text: string, id: number): Promise<Note> {
        return instance.put(`/notes`, {text: text, id: id})
    },
    deleteNotes(id: number):Promise<void> {
        return instance.delete(`/notes?id=${id}`)
    }
}