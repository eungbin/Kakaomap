import React from 'react';
import './../css/Header.css';

function Header() {
  return (
    <>
    <div className="container">
        <header>
            <h2>Kakao Map Test Page</h2>
            <nav>
                <div>
                    <button>Menu 1</button>
                    <button>Menu 2</button>
                    <button>Menu 3</button>
                    <button>Menu 4</button>
                </div>
            </nav>
        </header>
    </div>
    <hr /> <br />
    </>
  );
}

export default Header;
