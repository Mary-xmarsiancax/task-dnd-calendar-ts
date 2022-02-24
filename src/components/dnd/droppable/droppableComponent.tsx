import {Droppable} from "react-beautiful-dnd";
import DraggableComponent from "../draggble/draggableComponent";
import "./droppable.css"

const DroppableComponent = () => {
    return (
        <Droppable droppableId="droppableId">
            {(provided, snapshot) => (
                <div className="droppable-wr"
                     {...provided.droppableProps}
                     ref={provided.innerRef}
                >
                    <DraggableComponent/>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}
export default DroppableComponent;