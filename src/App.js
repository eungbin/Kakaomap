import React, {useState } from 'react';
import './App.css';
import Main from './Component/Main.js'
import Header from './Component/Header';

function App() {
  const [ pageState, setPageState ] = useState({
    page: 'Main'
  }); // useState 내부에 원래 state에 해당되는 데이터를 전달한다.

  const [ selected, setSelected ] = useState({
    selected: ''
  })

  const onHeaderSubmit = async (select) => {
    await setSelected({
      selected: select
    });
  }

  return (
    <>
      <div>
        <Header onSubmit={onHeaderSubmit} />
      </div>
      <div className="bodyTest">
        {pageState.page === 'Main' && <Main selected={selected} /> }
        {pageState.page === 'Test' && <h1>Test</h1> }
      </div>
    </>
  );
}

export default App;
