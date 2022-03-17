import startImg from "../../../img/start-img.jpg"
import "./start-content.css"
import registrationImg from "../../../img/start-img.jpg";

const StartContent = () => {
return (
    <div className="start-page-wr">
        <div className="registrationImg">
            <img src={registrationImg} alt="many cases "/>
        </div>
        <div className="motto"><h1>КАК НИЧЕГО НЕ ЗАБЫТЬ И НЕ СОЙТИ С УМА</h1></div>
    </div>

)
}
export default StartContent;