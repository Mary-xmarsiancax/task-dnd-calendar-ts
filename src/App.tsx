import React from 'react';
import './App.css';
import Header from "./components/header/header";
import MainContent from "./components/content/main-content";
import Footer from "./components/footer/footer";


const App = () => {
    return (
        <div className="app-wr">
            <Header/>
            <MainContent/>
            <Footer/>
        </div>
    )
}

export default App;
