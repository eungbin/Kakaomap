import React from 'react';
import './../css/Header.css';

function Header(props) {
    const selectBank = () => {
        props.onSubmit('BK9');
    }

    const selectConv = () => {
        props.onSubmit('CS2');
    }

    const selectSubway = () => {
        props.onSubmit('SW8');
    }

    const selectRoom = () => {
        props.onSubmit('AD5');
    }

    const selectRest = () => {
        props.onSubmit('FD6');
    }

    const selectCafe = () => {
        props.onSubmit('CE7');
    }
    
    const selectHospital = () => {
        props.onSubmit('HP8');
    }

    const selectMart = () => {
        props.onSubmit('MT1');
    }

    
    return (
        <>
        <div className="container">
            <header>
                <h2 className="header2">Kakao Map Test Page</h2>
                <nav>
                    <ul className="myMenu">
                        <li className="menu1 topmenu">Choose Category</li>
                        <li className="menu2 topmenu">List
                            <ul id="category" className="menu2_s submenu">
                                <li id="BK9" data-order="0" onClick={selectBank}>BANK</li>
                                <li id="CS2" data-order="5"onClick={selectConv}>CONVENIENCE</li>
                                <li id="SW8" data-order="9"onClick={selectSubway}>SUBWAY</li>
                                <li id="AD5" data-order="3"onClick={selectRoom}>ROOMS</li>
                                <li id="FD6" data-order="4"onClick={selectRest}>RESTAURANT</li>
                                <li id="CE7" data-order="4"onClick={selectCafe}>CAFE</li>
                                <li id="HP8" data-order="2"onClick={selectHospital}>HOSPITAL</li>
                                <li id="MT1" data-order="2"onClick={selectMart}>MART</li>
                            </ul>
                        </li>
                        <li className="menu3 topmenu">Infomation</li>
                    </ul>
                </nav>
            </header>
            <hr /> <br />
        </div>
        </>
    );
}

export default Header;
