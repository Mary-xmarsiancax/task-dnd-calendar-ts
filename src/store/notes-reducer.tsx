import {Note} from "../servises/api-types";

const ADD_NOTE = "ADD-NOTE"
export const addNote = (note: Note) => ({type: ADD_NOTE, payload: note})

let initialState: {notes: Array<Note>} = {
    notes: []
}

const notesReducer = (state = initialState, action:any) => {//actions all different
    switch (action.type) {
        case addNote: {

            state.notes.push(action.payload)
            return
        }
        default:
            return state;
    }
}
export default notesReducer;