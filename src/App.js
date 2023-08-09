import Header from './Header.js';
import Footer from './Footer.js'
import Main from './Main.js'
import React, {useState} from "react";
import './Style.css';


const App = () => {


  return (
    <div className="container">
    <Header />
    <Main />
    <Footer />
    </div>
)
}


export default App


