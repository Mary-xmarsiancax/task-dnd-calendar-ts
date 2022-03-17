import registrationImg from "../../img/start-img.jpg";
import LoginForm from "./login-form";
import "./login.css"

const Login = () => {
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