import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
    return (
        <div className="main-container">
            <div className="left-section">
                <Link to="/branch/Uptown Branch" className="image-container">
                    <img src="uptown.jpg" alt="Uptown" />
                    <div className="text-overlay">Uptown</div>
                </Link>
            </div>
            <div className="right-section">
                <Link to="/branch/Downtown Branch" className="image-container">
                    <img src="downtown.jpg" alt="Downtown" />
                    <div className="text-overlay">Downtown</div>
                </Link>
            </div>
        </div>
    );
};

export default MainPage;
