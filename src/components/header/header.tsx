import "./header.css"
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../store/redux-store";
import {usersApi} from "../../servises/api";
import {actions, getCurrentUsersData} from "../../store/auth-reducer";
import {Button} from "@mui/material";
import {useEffect} from "react";


const Header = () => {
    const dispatch = useDispatch()
    const username = useSelector<AppState>((state) => state.authStore.username) as string;
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch(getCurrentUsersData())
            navigate('/tasksContent', {replace: true})
        } else {
            navigate('/login', {replace: true})
        }
    }, [username])


    const onLogout = () => {
        usersApi.usersLogout()
        dispatch(getCurrentUsersData())
        if (!localStorage.getItem("token")) {
            navigate('/login', {replace: true})
        }
    }

    return (
        <div className="header-wr">
            <div className="header-text header-text-to-do">
                TO-DO CALENDAR
            </div>
            {username ?
                <div className="auth-text">
                <span className="header-text header-text-login">
                    {username}
                </span>
                    <Button variant="text" className="header-text header-text-registration link" onClick={onLogout}>
                        ВЫЙТИ
                    </Button>
                </div>
                :
                <div className="auth-text">
                 <span className="header-text header-text-login">
                <NavLink to="/login" className="link">
                ВОЙТИ
                </NavLink>
            </span>
                    <span className="header-text header-text-registration">
                <NavLink to="/registration" className="link">
                РЕГИСТРАЦИЯ
                </NavLink>
            </span>
                </div>
            }
        </div>
    )
}
export default Header;