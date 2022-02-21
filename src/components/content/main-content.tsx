import Login from "../login/login"
import {Route, Routes} from "react-router-dom";
import StartContent from "./start-content/start-content";
import Registration from "../registration/registration";
import TasksContent from "./tasks-content/tasks-content";

const MainContent = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<StartContent/>}/>
                <Route path="/tasksContent" element={<TasksContent/>}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </div>
    )
}
export default MainContent;