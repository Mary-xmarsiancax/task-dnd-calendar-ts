import {DragDropContext} from "react-beautiful-dnd";
import {useDispatch} from "react-redux";
import {setColumn, setItems} from "../../store/notes-reducer";
import "./dnd-context-component.css"
import DroppableComponent from "./droppable/droppableComponent";


const DndContextComponent = () => {
    const dispatch = useDispatch()

    const onDragEnd = (result: any) => {
        console.log("result.destination",result.destination);
        if (!result.destination) {
            return;
        }

        // if (result.source.droppableId !== result.destination.droppableId) {
        //     dispatch(setColumn(result))
        // }
        else {
            dispatch(setItems(result.source.index, result.destination.index))
        }
        console.log("result", result);
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