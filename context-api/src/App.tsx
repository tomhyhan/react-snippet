import React, {useState, useContext, useReducer}from 'react';
import './App.css';
import Button from './components/button.component';
import Square from './components/squareComponent';
import Board from './components/gameComponent';
import {ThemeContext, themes} from './context/theme-context'
import ThemeToggleComponent from './components/themeToggleComponent'

type Next = 'O' | 'X' | null
export type Squares = Next[]

type S = {
  squares: Squares
}
type history = S[]

function App() {
  const [theme, setTheme] = useState(themes.red)
  const [history, setHistory] = useState<history>([
    { squares: new Array(9).fill(null) },
  ]);
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const historyTracker = history.slice(0, stepNumber + 1);
  const current = historyTracker[stepNumber];


  const handleClick = (i : number) => {
    const newSquares = [...current.squares];
    if (isWinner(current.squares) || current.squares[i]) return;
    newSquares[i] = xIsNext ? 'X' : 'O';
    setXIsNext(!xIsNext);
    const newHistory = [...historyTracker, { squares: newSquares }];
    setHistory(newHistory);

    setStepNumber(newHistory.length - 1);
  };

  const jumpTo = (move : number) => {
    setStepNumber(move);
    setXIsNext(move % 2 === 0);
  };

  const renderSquare = (i: number) => {
    const value = current.squares[i];
    return <Square value={value} onClick={() => handleClick(i)} />
  }

  // This is a way to chage the state of the context value
  // by directly change the value of the context provider
  function Toolbar(props : any) {
    return (
      <button onClick={props.changeTheme}>
        changeBorder
      </button>
    );
  }
  const ToggleTheme = () => {
    const newTheme = theme === themes.red? themes.green: themes.red
    setTheme(newTheme)
  }

  const winner = isWinner(current.squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }
  return (
    <div className='game'>
      <ThemeContext.Provider value={{theme:theme, toggleTheme:ToggleTheme}}>
      <div className='game-board'>
       
        <Board child={renderSquare}/>
        
      </div>
      
      <div className='game-info'>
        <div>{status}</div>
        <ol>
          {historyTracker.map((step: S, move) => (
            <Button
              key={move}
              step={step}
              move={move}
              onClick={() => jumpTo(move)}
            />
          ))}
        </ol>
      </div>
      <Toolbar changeTheme={ToggleTheme}/>
      {/* This one changes the state of the context in the nested child */}
      <ThemeToggleComponent />
      </ThemeContext.Provider>
      <Counter />
    </div>
    
  );
}

export default App;

function init(initialCount : any) {
  return {count: 0};
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({initialCount}: any) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}





function isWinner(squares : Squares) {
  const winners = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const winner of winners) {
    if (
      squares[winner[0]] &&
      squares[winner[0]] === squares[winner[1]] &&
      squares[winner[1]] === squares[winner[2]]
    ) {
      return squares[winner[0]];
    }
  }
  return false;
}
