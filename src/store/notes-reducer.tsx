import {Note} from "../servises/api-types";
import {notesApi} from "../servises/api";
import {InferActionsTypes} from "./redux-store";


const actions = {
    setNotes: (notes: Array<Note>) => ({type: "SET_NOTES", notes} as const),
    setItems: (startIndex: number, endIndex: number, sourceDroppableId: string) => ({type: "SET_ITEMS", startIndex, endIndex,sourceDroppableId} as const),
    setItemToNewColumn: (sourceDroppableId: string, sourceIndex: number, destinationDroppableId: string, destinationIndex: number) =>
        ({
            type: "SET_ITEM_TO_NEW_COLUMN",
            sourceDroppableId,
            sourceIndex,
            destinationDroppableId,
            destinationIndex
        } as const)
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
type Delete = { delete: Array<Note> }
export type NotesState = Notes & Sunday & Monday & Tuesday & Wednesday & Thursday & Friday & Saturday & Delete

export const DAYS_OF_WEEK: Record<string, string> = {
    notes: "Задания:",
    monday: "Понедельник",
    tuesday: "Вторник",
    wednesday: "Среда",
    thursday: "Четверг",
    friday: "Пятница",
    saturday: "Суббота",
    sunday: "Воскресенье",
    delete: ""
}

let initialState: NotesState = {
    notes: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
    delete: [],
}

const notesReducer = (state = initialState, action: NotesActionsType) => {
    switch (action.type) {
        case "SET_NOTES": {
            let copyState = {...state}
            copyState = action.notes.reduce((acc, curr) => {
                acc[curr.label].push(curr)
                // acc[curr.label].sort((a: Note, b: Note) => {
                //     return Number(a.color) - Number(b.color)
                // })
                return acc
            }, {
                notes: [],
                monday: [],
                tuesday: [],
                wednesday: [],
                thursday: [],
                friday: [],
                saturday: [],
                sunday: [],
                delete: [],
            } as any)
            return copyState
        }
        case "SET_ITEMS": {
            let copyState = {...state}
            let columnCopy = [...state[action.sourceDroppableId as keyof NotesState]]
            const removed = columnCopy.splice(action.startIndex, 1)
            let result = columnCopy
            result.splice(action.endIndex, 0, ...removed)
            copyState[action.sourceDroppableId as keyof NotesState] = result
            return copyState;
        }
        case "SET_ITEM_TO_NEW_COLUMN": {
            let copyState = {...state}
            const sourceColumn = [...copyState[action.sourceDroppableId as keyof NotesState]];
            const destColumn = [...copyState[action.destinationDroppableId as keyof NotesState]];
            const [removed] = sourceColumn.splice(action.sourceIndex, 1);
            destColumn.splice(action.destinationIndex, 0, removed);
            copyState[action.sourceDroppableId as keyof NotesState] = sourceColumn;
            copyState[action.destinationDroppableId as keyof NotesState] = destColumn;
            return copyState;
        }
        default:
            return state;
    }
}

//thunks

export const setNewTask = (text: string, droppableId: string) => (dispatch: any) => {
    notesApi.setNote(text, droppableId)
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
export const deleteNote = (id: number) => (dispatch: any) => {
    notesApi.deleteNote(id)
        .then(response => {
            notesApi.getNotes()
                .then(response => {
                    dispatch(actions.setNotes(response.data))
                })
        })
}
export const setItems = (startIndex: number, endIndex: number,sourceDroppableId:string) => (dispatch: any) => {
    dispatch(actions.setItems(startIndex, endIndex,sourceDroppableId))
}
export const setColumn = (sourceDroppableId: string, sourceIndex: number,
                          destinationDroppableId: string, destinationIndex: number) =>
    (dispatch: any) => {
        dispatch(actions.setItemToNewColumn(sourceDroppableId, sourceIndex, destinationDroppableId, destinationIndex))
    }
export const updateNote = (id: number, droppableId: string) => (dispatch: any) => {
    notesApi.updateNote(id, droppableId)
        .then(response => {
            // notesApi.getNotes()
            //     .then(response => {
            //         dispatch(actions.setNotes(response.data))
            //     })
        })
}
// export const updateNotesIndex = (index: number) => (dispatch: any) => {
    //notesApi.updateNote(id, droppableId)
    //     .then(response => {
    //                 notesApi.getNotes()
    //                     .then(response => {
    //                         dispatch(actions.setNotes(response.data))
    //                     })
    //             })
    //     }
    export default notesReducer;