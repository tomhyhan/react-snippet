import React, {useState, useContext, memo}from 'react';
import './App.css';
import Button from './components/button.component';
import {ThemeContext} from './index'

type Next = 'O' | 'X' | null
export type Squares = Next[]

interface BoardProps {
  value: Next;
  onClick: () => void
}

const Square = memo(({ value, onClick }: BoardProps) => {
  const handleClick = () => {
    onClick();
  };
  return (
    <button onClick={handleClick} className='square'>
      {value}
    </button>
  );
});
// class Board extends React.Component {

interface GameProps {
  child: (i : number) => JSX.Element
}

const Board = ({ child}: GameProps) => {
  // const renderSquare = (i : number) => {
  //   const value = squares[i];
  //   return child(value, () => onClick(i))
  //   return <Square value={value} onClick={() => onClick(i)} />;
  // };

  const theme = useContext(ThemeContext) // consumer
  return (
    <div>
      <div className='board-row'>
        {child(0)}
        {child(1)}
        {child(2)}
      </div>
      <div className='board-row'>
        {child(3)}
        {child(4)}
        {child(5)}
      </div>
      <div className='board-row'>
        {child(6)}
        {child(7)}
        {child(8)}
      </div>
      <p>{theme}</p>
    </div>
  );
};
type S = {
  squares: Squares
}
type history = S[]
function App() {
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

  const winner = isWinner(current.squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }
  return (
    <div className='game'>
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
      
    </div>
    
  );
}

export default App;




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
