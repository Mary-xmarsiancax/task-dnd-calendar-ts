import {Button, Divider, IconButton, InputBase, Paper, TextField} from "@mui/material";
import "./tasks-content.css"
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {setNewTask} from "../../../store/notes-reducer";

const TasksContent = () => {
    let [inputsText, setInputsText] = useState("")
    let dispatch = useDispatch()

    const onChangeTasksInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputsText(e.target.value)
    }

    const onAddTask = (inputsText: string):void => {
        dispatch(setNewTask(inputsText))
    }

    return (
        <div className="tasks-wr">
            <div className="input-text">
                <Paper className="tasks-input"
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
                    <IconButton color="primary" sx={{p: '10px'}} aria-label="directions">
                        <Button className="button-go" onClick={()=>onAddTask(inputsText)}>GO</Button>
                    </IconButton>
                </Paper>
            </div>
            <div>tasks map zone</div>
            <div>weeks days
                <div>пн</div>
                <div>вт</div>
                <div>ср</div>
                <div>чт</div>
                <div>пт</div>
                <div>сб</div>
            </div>
        </div>
    )
}
export default TasksContent;