import "./header.css"
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../store/redux-store";
import {usersApi} from "../../servises/api";
import {getCurrentUsersData} from "../../store/auth-reducer";
import {Button} from "@mui/material";


const Header = () => {
    const dispatch = useDispatch()
    const username = useSelector<AppState>((state) => state.authStore.username) as string;
    const onLogout = () => {
        usersApi.usersLogout()
        dispatch(getCurrentUsersData())
        // usersApi.getCurrentUser()
        //     .then(response => {
        //         dispatch(setRegistrationData({...response.data}));
        //     }, err => {
        //         setAuthorizationHeader("");
        //         navigate('/login', {replace: true})
        //         dispatch(setRegistrationData(
        //             {
        //                 id: null,
        //                 username: ""
        //             })
        //         )
        //     })
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
                    <Button variant="text" className="header-text header-text-registration" onClick={onLogout}>
                        ВЫЙТИ
                    </Button>
                </div>
                :
                <div className="auth-text">
                 <span className="header-text header-text-login">
                <NavLink to="/login">
                ВОЙТИ
                </NavLink>
            </span>
                    <span className="header-text header-text-registration">
                <NavLink to="/registration">
                РЕГИСТРАЦИЯ
                </NavLink>
            </span>
                </div>
            }
        </div>
    )
}
export default Header;