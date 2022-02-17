import React from 'react';
import './App.css';
import Header from "./components/header/header";
import MainContent from "./components/content/main-content";

function App() {
  return (
    <div className="app-wr">
   <Header/>
   <MainContent/>
    </div>
  );
}

export default App;
