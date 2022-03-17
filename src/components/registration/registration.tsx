import registrationImg from "../../img/start-img.jpg";
import "./registration.css"
import RegistrationForm from "./registration-form";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../store/redux-store";
import Preloader from "../preloader/preloader";
import {useEffect} from "react";
import {actions} from "../../store/auth-reducer";

const Registration = () => {
    const registrationTextError = useSelector<AppState>((state) => state.authStore.registrationTextError)as string;
    let dispatch = useDispatch()
    useEffect(() => {
        if(registrationTextError){
            dispatch(actions.setRegistrationErrorsText(""))
        }
    }, [])
    return (
        <div>
            <div className="registration-wr">
                <img src={registrationImg} alt="many cases "/>
                <div className="motto"><h1>КАК НИЧЕГО НЕ ЗАБЫТЬ И НЕ СОЙТИ С УМА</h1></div>
                <div className="registration-form-block">
                    <RegistrationForm/>
                </div>
            </div>
        </div>

    )
}
export default Registration;