import registrationImg from "../../img/start-img.jpg";
import "./registration.css"
import RegistrationForm from "./registration-form";
import {useSelector} from "react-redux";
import {AppState} from "../../store/redux-store";
import Preloader from "../preloader/preloader";

const Registration = () => {
    const isLoading = useSelector<AppState>((state) => state.authStore.isLoading)as string;
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