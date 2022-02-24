import {Note} from "../servises/api-types";
import {notesApi} from "../servises/api";
import {InferActionsTypes} from "./redux-store";


const actions = {
    setNotes: (notes: Array<Note>) => ({type: "SET_NOTES", notes}as const),
    setItems: (startIndex: number, endIndex: number) => ({type: "SET_ITEMS", startIndex, endIndex}as const)
}
type NotesActionsType = InferActionsTypes<typeof actions>

let initialState: { notes: Array<Note>, sunday: Array<Note>, monday:Array<Note>,tuesday: Array<Note>
    wednesday:Array<Note>, thursday:Array<Note>, friday:Array<Note>, saturday:Array<Note>} =
    {
    notes: [],
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: []
}

const notesReducer = (state = initialState, action: NotesActionsType) => {
    switch (action.type) {
        case "SET_NOTES": {
            let copyState = {...state}
            copyState.notes = action.notes
            return copyState
        }
        case "SET_ITEMS": {
            let copyState = {...state}
            let notesCopy = [...state.notes]
            const removed = notesCopy.splice(action.startIndex, 1)
            let result = notesCopy
            result.splice(action.endIndex, 0, ...removed)
            copyState.notes = result
            return copyState;
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
                    dispatch(actions.setNotes(response.data))
                })
        })
}
export const getNotes = () => (dispatch: any) => {
    notesApi.getNotes()
        .then(response => {
            dispatch(actions.setNotes(response.data))
        })
}
export const setItems = (startIndex: number, endIndex: number) => (dispatch: any) => {
    dispatch(actions.setItems(startIndex, endIndex))
}
export default notesReducer;