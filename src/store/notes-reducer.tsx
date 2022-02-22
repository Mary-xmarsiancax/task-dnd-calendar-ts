import {Note} from "../servises/api-types";
import {notesApi} from "../servises/api";


const actions = {
    setNotes: (notes: Note) => ({type: "SET_NOTES", notes}),
}

let initialState: { notes: Array<Note>} = {
    notes: [],
}

const notesReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "SET_NOTES": {
            let copyState = {...state}
            copyState.notes = action.notes
            return copyState
        }
        default:
            return state;
    }
}

//thunks

export const setNewTask = (text: string) => (dispatch: any) => {
    notesApi.setNotes(text)
        .then(response => {
            notesApi.getNotes()
                .then(response => {
                    dispatch(actions.setNotes)
                })
        })
}
export default notesReducer;