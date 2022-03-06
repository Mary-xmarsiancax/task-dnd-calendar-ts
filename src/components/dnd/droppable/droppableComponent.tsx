import {useDispatch, useSelector, useStore} from "react-redux";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {Note} from "../../../servises/api-types";
import "./droppable.css"
import {AppState} from "../../../store/redux-store";
import {useEffect} from "react";
import {DAYS_OF_WEEK, getNotes, NotesState} from "../../../store/notes-reducer";


const DroppableComponent = () => {
    const state = useSelector<AppState>((state): NotesState=> state.notesStore) as NotesState;
    let dispatch = useDispatch()
    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch(getNotes())
        }
    }, [])

    return (
        <div className="droppable-component-wr" >
            {Object.entries(state).map((arr, index) =>
                <div className={index===0?"notesStyle droppable-el":index===8?"deleteStyle droppable-el":"droppable-el"} key={arr[0]}>
                    <h4>{DAYS_OF_WEEK[arr[0]]}</h4>

                        <Droppable droppableId={arr[0]} >
                            {(provided, snapshot) => (
                                <div className="droppable-wr"
                                     {...provided.droppableProps}
                                     ref={provided.innerRef}
                                >
                                    {(arr[1] as Array<Note>).map((el: Note, index: number) =>
                                    <Draggable  draggableId={el.id.toString()} index={index} key={el.id} >
                                        {(provided, snapshot) => (
                                            <div className={arr[0]==="delete"? "itemsEl itemsElDelete":"itemsEl"} ref={provided.innerRef}
                                                 {...provided.draggableProps}
                                                 {...provided.dragHandleProps}>
                                                {el.text}
                                            </div>
                                        )}
                                    </Draggable>
                                    // </div>
                                    )}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                </div>
            )}
        </div>
    )
}
export default DroppableComponent;