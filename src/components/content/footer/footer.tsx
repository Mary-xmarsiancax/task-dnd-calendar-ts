import "./footer.css"
const Footer = () => {
    return (
        <div className="footer-wr">
            <div className="footer-moto">Присоединяйтесь к миллионам людей, которые организуют жизнь и работу
                с помощью To-Do-Calendar
            </div>
            <div className="footer-items">
                <div>
                    <h5>ВОЗМОЖНОСТИ</h5>
                    <ol>
                        <li>Как это работает</li>
                        <li>Для команд</li>
                        <li>Тарифы</li>
                        <li>Шаблоны</li>
                    </ol>
                </div>
                <div>
                    <h5>РЕСУРСЫ</h5>
                    <ol>
                        <li> Скачать приложения</li>
                        <li>
                        </li>
                        <li> Справочный центр</li>
                        <li> Рассказать друзьям</li>
                        <li>Партнерская программа</li>
                    </ol>
                </div>
                <div>
                    <h5>КОМПАНИЯ</h5>
                    <ol>
                        <li>О нас</li>
                        <li>Вакансии</li>
                        <li>Блог</li>
                        <li>Пресса</li>
                    </ol>
                </div>
            </div>

        </div>
    )
}
export default Footer;