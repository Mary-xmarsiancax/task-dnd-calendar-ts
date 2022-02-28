import {useDispatch, useSelector, useStore} from "react-redux";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {Note} from "../../../servises/api-types";
import "./droppable.css"
import {AppState} from "../../../store/redux-store";
import {useEffect} from "react";
import {DAYS_OF_WEEK, getNotes, NotesState} from "../../../store/notes-reducer";

const DroppableComponent = () => {
    const state = useSelector<AppState>((state): NotesState=> state.notesStore) as NotesState;
    const username = useSelector<AppState>((state) => state.authStore.username) as string;
    let dispatch = useDispatch()
    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch(getNotes())
        }
    }, [username])

    return (
        <div className="droppable-component-wr" >
            {Object.entries(state).map((arr, index) =>
                <div className="droppable-el" key={arr[0]}>
                    <h4>{DAYS_OF_WEEK[arr[0]]}</h4>
                    {(arr[1] as Array<Note>).map((el: Note, index: number) =>
                        <Droppable droppableId="droppableId" key={el.id}>
                            {(provided, snapshot) => (
                                <div className="droppable-wr"
                                     {...provided.droppableProps}
                                     ref={provided.innerRef}
                                >
                                    <div className="draggable-wr">
                                    <Draggable key={el.id} draggableId={el.id.toString()} index={index}>
                                        {(provided, snapshot) => (
                                            <div className="itemsEl" ref={provided.innerRef}
                                                 {...provided.draggableProps}
                                                 {...provided.dragHandleProps}>
                                                {el.text}
                                            </div>
                                        )}
                                    </Draggable>
                                    </div>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    )}
                </div>
            )}
        </div>
    )
}
export default DroppableComponent;