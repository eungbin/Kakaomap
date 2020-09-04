import React from 'react';
import './../css/Header.css';

function Header() {
    const test = () => {
        console.log("test");
    }
    return (
        <>
        <div className="container">
            <header>
                <h2>Kakao Map Test Page</h2>
                <nav>
                    <ul className="myMenu">
                        <li className="menu1 topmenu">Choose Category</li>
                        <li className="menu2 topmenu" onClick={test}>List
                            <ul className="menu2_s submenu">
                                <li className="list">TEST0</li>
                                <li className="list">TEST1</li>
                                <li className="list">TEST2</li>
                                <li className="list">TEST3</li>
                                <li className="list">TEST4</li>
                                <li className="list">TEST5</li>
                            </ul>
                        </li>
                        <li className="menu3 topmenu">Infomation</li>
                    </ul>
                </nav>
            </header>
        </div>
        <hr /> <br />
        </>
    );
}

export default Header;
