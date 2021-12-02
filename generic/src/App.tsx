import React from 'react';
import './App.css';
import GridComponent from './component/gridComponent';


function App() {
  const fruits = {
    1 : {id:1, product: 'apple', cost:1},
    2 : {id:2, product: 'banana', cost:1.5},
    3 : {id:3, product: 'grape', cost:6},
  }
  
  const users = {
   1 : {id:1, name: 'apple', profile:"apple"},
   2 : {id:2, name: 'banana', profile:"banana"},
   3 : {id:3, name: 'grape', profile:"grape"},
}
  return (
    <div className="App">
      <GridComponent items={fruits}/>
      <br/>
      <GridComponent items={users}/>
    </div>
  );
}

export default App;
