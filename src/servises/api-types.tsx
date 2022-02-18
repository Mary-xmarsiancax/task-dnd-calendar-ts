export type Note = {
    id: number,
    text: string,
    color: string,
    label: string,
    backgroundColor: string
}

export type Current = {
    id: number,
    username: string
}

export type LoginForm = {
    username: string,
    password: string
}
export type UserResponse = {
    id: number,
    username: string,
    token: string
}


