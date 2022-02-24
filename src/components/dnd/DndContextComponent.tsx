import DroppableComponent from "./droppable/droppableComponent";
import {DragDropContext} from "react-beautiful-dnd";
import {useDispatch} from "react-redux";
import {setItems} from "../../store/notes-reducer";
import {useState} from "react";


const DndContextComponent = () => {
    const dispatch = useDispatch()
    const onDragEnd = (result:any) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            });
        }
        // console.log(result);
        // if (!result.destination) {
        //     return;
        // } else {
        //     dispatch(setItems(result.source.index,result.destination.index))
        // }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <DroppableComponent/>
        </DragDropContext>
    )
}
export default DndContextComponent;