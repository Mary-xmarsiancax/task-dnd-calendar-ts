import {DragDropContext} from "react-beautiful-dnd";
import {useDispatch} from "react-redux";
import {deleteNote, setColumn, setItems, updateNoteDroppable} from "../../store/notes-reducer";
import "./dnd-context-component.css"
import DroppableComponent from "./droppable/droppableComponent";


const DndContextComponent = () => {
    const dispatch = useDispatch()

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }
        if (result.source.droppableId !== result.destination.droppableId) {
            if (result.destination.droppableId === "delete") {
                dispatch(deleteNote(result.draggableId))
            } else {
                dispatch(setColumn(result.source.droppableId, result.source.index,
                    result.destination.droppableId, result.destination.index))
                dispatch(updateNoteDroppable(result.draggableId, result.destination.droppableId))
                //dispatch(updateNotesIndex(index)
            }
        } else {
            dispatch(setItems(result.source.index, result.destination.index, result.source.droppableId))
            // dispatch(updateNotesIndex(result.destination.droppableId, state))
            // dispatch(updateNote(result.draggableId,result.destination.droppableId,result.destination.index))
        }
    }

    return (
        <div className="dnd-context-component-wr">
            <DragDropContext onDragEnd={onDragEnd}>
                <DroppableComponent/>
            </DragDropContext>
        </div>

    )
}
export default DndContextComponent;