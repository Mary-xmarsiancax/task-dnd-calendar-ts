import {DragDropContext} from "react-beautiful-dnd";
import {useDispatch} from "react-redux";
import {deleteNote, setColumn, setItems} from "../../store/notes-reducer";
import "./dnd-context-component.css"
import DroppableComponent from "./droppable/droppableComponent";


const DndContextComponent = () => {
    const dispatch = useDispatch()

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }
        if (result.source.droppableId !== result.destination.droppableId) {
            dispatch(setColumn(result.source.droppableId, result.source.index,
                result.destination.droppableId, result.destination.index, result.draggableId))
            if (result.destination.droppableId === "delete") {
                dispatch(deleteNote(result.draggableId))
            }
        } else {
            dispatch(setItems(result.source.index, result.destination.index, result.source.droppableId))
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