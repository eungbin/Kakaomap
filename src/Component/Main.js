import React from 'react';
import './../css/Main.css';
import Kakaomap from './Kakaomap/Kakaomap.js';
function Main(props) {
    const test = () => {
        console.log(props.selected);
    }

    return (
        <>
            <div className="Body">
                <h1 className="title" onClick={test}>Kakao Map</h1>
                <p className="info">There may be some errors in the position.</p>
                <Kakaomap selected={props.selected} />
            </div>
        </>
    )
}

export default Main;
