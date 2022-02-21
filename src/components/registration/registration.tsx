import registrationImg from "../../img/start-img.jpg";
import "./registration.css"
import RegistrationForm from "./registration-form";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Registration = () => {
    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/tasksContent", {replace: true})
        }
    }, [])

    return (
        <div className="registration-wr">
            <img src={registrationImg} alt="many cases "/>
            <div className="motto"><h1>КАК НИЧЕГО НЕ ЗАБЫТЬ И НЕ СОЙТИ С УМА</h1></div>
            <div className="registration-form-block">
                <RegistrationForm/>
            </div>
        </div>
    )
}
export default Registration;