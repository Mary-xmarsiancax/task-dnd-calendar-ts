import preloader from "../../img/preloader.gif"
import "./preloader.css"
import startImg from "../../img/start-img.jpg";

const Preloader = () => {
    return (
            <div className="preloader">
                <img  src={preloader} alt="preloader"/>
            </div>
    )
}
export default Preloader;