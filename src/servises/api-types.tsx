export type Note = {
    id: number,
    text: string,
    color: string,
    label: string,
    backgroundColor: string
}

export type AuthData = {
    id: number | null,
    username: string
}

export type LoginForm = {
    username: string,
    password: string
}

export type UserResponseData = {
    id: number,
    username: string,
    token: string
}



