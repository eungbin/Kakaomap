import React from 'react';
// import './App.css';
import Main from './Component/Main.js'
import Header from './Component/Header';

function App() {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="Body">
        <Main />
      </div>
    </>
  );
}

export default App;
