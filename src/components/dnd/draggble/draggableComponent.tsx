import {Draggable} from "react-beautiful-dnd";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../store/redux-store"
import {useEffect} from "react";
import {getNotes} from "../../../store/notes-reducer";
import "./draggable.css"

const DraggableComponent = () => {
    const username = useSelector<AppState>((state) => state.authStore.username) as string;
    let dispatch = useDispatch()
    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch(getNotes())
        }
    }, [username])
    const notes: any = useSelector<AppState>((state) => state.notesStore.notes);
    return (
        <div className="draggable-wr">
            {notes.map((obj: any, index: number) =>
                <Draggable key={obj.id} draggableId={obj.id.toString()} index={index}>
                    {(provided, snapshot) => (
                        <div className="itemsEl" ref={provided.innerRef}
                             {...provided.draggableProps}
                             {...provided.dragHandleProps}>
                            {obj.text}
                        </div>
                    )}
                </Draggable>
            )}

        </div>
    )
}
export default DraggableComponent;