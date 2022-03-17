import registrationImg from "../../img/start-img.jpg";
import LoginForm from "./login-form";
import "./login.css"
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../store/redux-store";
import {useEffect} from "react";
import {actions} from "../../store/auth-reducer";

const Login = () => {
    const registrationTextError = useSelector<AppState>((state) => state.authStore.registrationTextError) as string;
    let dispatch = useDispatch()
    useEffect(() => {
        if(registrationTextError){
            dispatch(actions.setRegistrationErrorsText(""))
        }
    }, [])
    return (
        <div>
            <div className="registration-wr">
                <div className="registrationImg">
                    <img src={registrationImg} alt="many cases "/>
                </div>

                <div className="motto"><h1>КАК НИЧЕГО НЕ ЗАБЫТЬ И НЕ СОЙТИ С УМА</h1></div>
                <div className="registration-form-block">
                    <LoginForm/>
                </div>
            </div>
        </div>

    )
}
export default Login;