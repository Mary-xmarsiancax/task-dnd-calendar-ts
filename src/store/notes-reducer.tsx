import {Note} from "../servises/api-types";
import {notesApi} from "../servises/api";
import {InferActionsTypes} from "./redux-store";


const actions = {
    setNotes: (notes: Array<Note>) => ({type: "SET_NOTES", notes} as const),
    setItems: (startIndex: number, endIndex: number) => ({type: "SET_ITEMS", startIndex, endIndex} as const),
    setColumn: (result: any) => ({type: "SET_COLUMN", result} as const)
}
type NotesActionsType = InferActionsTypes<typeof actions>

type Notes = { notes: Array<Note> }
type Sunday = { sunday: Array<Note> }
type Monday = { monday: Array<Note> }
type Tuesday = { tuesday: Array<Note> }
type Wednesday = { wednesday: Array<Note> }
type Thursday = { thursday: Array<Note> }
type Friday = { friday: Array<Note> }
type Saturday = { saturday: Array<Note> }
export type NotesState = Notes & Sunday & Monday & Tuesday & Wednesday & Thursday & Friday & Saturday

export const DAYS_OF_WEEK: Record<string, string> = {
    notes: "Задания:",
    monday: "Понедельник",
    tuesday: "Вторник",
    wednesday: "Среда",
    thursday: "Четверг",
    friday: "Пятница",
    saturday: "Суббота",
    sunday: "Воскресенье",

}

let initialState: NotesState = {
    notes: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
}

const notesReducer = (state = initialState, action: NotesActionsType) => {
    switch (action.type) {
        case "SET_NOTES": {
            let copyState = {...state}
            copyState.notes = action.notes
            return copyState
        }
        case "SET_ITEMS": {
            debugger
            let copyState = {...state}
            let notesCopy = [...state.notes]
            const removed = notesCopy.splice(action.startIndex, 1)
            console.log(removed);
            notesCopy.splice(action.endIndex, 0, ...removed)
            return copyState;
            console.log(copyState);
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
export const setColumn = (result: any) => (dispatch: any) => {
    // const {source, destination} = result;
    // const sourceColumn = columns[source.droppableId];
    // console.log("sourceColumn", sourceColumn);
    // const destColumn = columns[destination.droppableId];
    // console.log("destColumn", destColumn);
    // const sourceItems = [...sourceColumn.items];
    // console.log("sourceItems", sourceItems);
    // const destItems = [...destColumn.items];
    // console.log("destItems", destItems);
    // const [removed] = sourceItems.splice(source.index, 1);
    // destItems.splice(destination.index, 0, removed);
    // setColumns({
    //     ...columns,
    //     [source.droppableId]: {
    //         ...sourceColumn,
    //         items: sourceItems
    //     },
    //     [destination.droppableId]: {
    //         ...destColumn,
    //         items: destItems
    //     }
    // });
    // dispatch(actions.setColumn())
}
export default notesReducer;