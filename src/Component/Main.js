import React from 'react';
import './../css/Main.css';
import Kakaomap from './Kakaomap/Kakaomap.js';
function Main() {
    return (
        <>
            <div className="Body">
                <h1 className="title">Kakao Map</h1>
                <p className="info">There may be some errors in the position.</p>
                <Kakaomap />
            </div>
        </>
    )
}

export default Main;
