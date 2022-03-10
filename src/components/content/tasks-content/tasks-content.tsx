import {Divider, IconButton, InputBase, Paper} from "@mui/material";
import "./tasks-content.css"
import React, {FormEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setNewTask} from "../../../store/notes-reducer";
import DndContextComponent from "../../dnd/DndContextComponent";
import {AppState} from "../../../store/redux-store";

const TasksContent = () => {
    let [inputsText, setInputsText] = useState("")
    let dispatch = useDispatch()
    const notes = useSelector<AppState>((state) => state.notesStore.notes)as string;

    const onChangeTasksInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputsText(e.target.value)
    }

    const onAddTask = (text: string, droppableId: string, index: number): void => {
        dispatch(setNewTask(text, droppableId, index))
        setInputsText("")
    }

    const onSubmitAddTask = (e: FormEvent<HTMLDivElement>): void => {
        e.preventDefault()
        onAddTask(inputsText, "notes", notes.length)
        setInputsText("")
    }

    return (
        <div className="tasks-wr">
            <div className="input-text" onSubmit={onSubmitAddTask}>
                < Paper className="tasks-input"
                        component="form"
                        sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}
                >
                    <IconButton sx={{p: '10px'}} aria-label="menu">
                    </IconButton>
                    <InputBase onChange={onChangeTasksInput}
                               sx={{ml: 1, flex: 1}}
                               placeholder="Новое задание"
                               inputProps={{'aria-label': 'Новое задание'}}
                               value={inputsText}
                    />
                    <IconButton type="submit" sx={{p: '10px'}} aria-label="search">
                    </IconButton>
                    <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
                    <IconButton color="primary" sx={{p: '10px'}} aria-label="directions"
                                onClick={() => onAddTask(inputsText, "notes", notes.length)}>GO
                    </IconButton>
                </Paper>
            </div>
            <div className="dnd-wr">
                <DndContextComponent/>
            </div>

        </div>
    )
}
export default TasksContent;