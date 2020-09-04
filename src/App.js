import React, {useState } from 'react';
import './App.css';
import Main from './Component/Main.js'
import Header from './Component/Header';

function App() {
  const [ pageState, setPageState ] = useState({
    pages: [
      { page: 'Main' }
    ]
  }); // useState 내부에 원래 state에 해당되는 데이터를 전달한다.

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="Body">
        {pageState.pages[0].page === 'Main' && <Main /> }
        {pageState.pages[0].page === 'Test' && <h1>Test</h1> }
      </div>
    </>
  );
}

export default App;
