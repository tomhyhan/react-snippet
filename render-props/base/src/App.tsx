import React, {useState}from 'react';
import './App.css';
const Cat = ( {coordinate } : any) =>{

  const mouse = coordinate;
  return (
    <img src="http://placekitten.com/50/50" alt='cat' style={{ position: 'absolute', left: (mouse.x + 5), top: (mouse.y + 5) }} />
  );

}

const Mouse = ({render} : any) =>  {
const [coordinate, setCoordinate] = useState({x:0,y:0})

const handleMouseMove= (event : any) => {
  const newCoor = {
    x: event.clientX,
    y: event.clientY
  } 
  setCoordinate(newCoor)
}

const newCor= (coordinate : any) => {
  const newCoor = {
    x: coordinate.x + 30 ,
    y: coordinate.y + 30
  }
  return newCoor
}


  return (
    <div style={{ height: '100vh' }} onMouseMove={handleMouseMove}>

      {/* ...but how do we render something other than a <p>? */}
      <p>The current mouse position is ({coordinate.x} {coordinate.y})</p>
      {/* <Cat coordinate={coordinate} /> */}
      {render(coordinate)}
      {render(newCor(coordinate))}
    </div>
  )
}

const MouseTracker = ()=> {
  // If we use a render prop inside a render, it generates a new fn everytime
  // which negates the effect if child components with memo
  // Creating a new fn for render prop prevents a fn from creating on every render.

  // Also, if have multiple props to pass from the parent component
  // provide those states in here!
  const returnTheCat = (coordinate : any)=> {
    <Cat coordinate={coordinate}/>
  }

    return (
      <>
        <h1>Move the mouse around!</h1>
        {/* instead if hard coding Cat component inside a Mouse Component */}
        {/* we essentially decoupled Cat and Mouse component using render prop */}
        <Mouse render={returnTheCat}/>
      </>
    );

}

function App() {
  return (
    <div className="App">
      <MouseTracker />
    </div>
  );
}

export default App;
