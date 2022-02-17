import "./header.css"
import {NavLink, useNavigate} from "react-router-dom";

const Header = () => {
    return (
        <div className="header-wr">
            <span className="header-text header-text-to-do">
                TO-DO CALENDAR
            </span>
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
    )
}
export default Header;