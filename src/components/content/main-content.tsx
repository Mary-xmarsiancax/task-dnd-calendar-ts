import Login from "../login/login"
import {Route, Routes} from "react-router-dom";
import StartContent from "./start-content/start-content";
import Registration from "../registration/registration";
import TasksContent from "./tasks-content/tasks-content";
import {useSelector} from "react-redux";
import {AppState} from "../../store/redux-store";
import Preloader from "../preloader/preloader";


const MainContent = () => {
    const isLoading = useSelector<AppState>((state) => state.authStore.isLoading)as string;
    return (
        <div>
            <Routes>
                <Route path="/" element={<StartContent/>}/>
                <Route path="/tasksContent" element={<TasksContent/>}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
            {isLoading ?
                <Preloader/>
                : null}
        </div>
    )
}
export default MainContent;