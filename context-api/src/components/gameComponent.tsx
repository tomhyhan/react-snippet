

interface GameProps {
    child: (i : number) => JSX.Element
  }
  
  const Board = ({ child}: GameProps) => {
    // const renderSquare = (i : number) => {
    //   const value = squares[i];
    //   return child(value, () => onClick(i))
    //   return <Square value={value} onClick={() => onClick(i)} />;
    // };
  

    return (
      <div>
        <div className='board-row' >
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
      </div>
    );
  };

  export default Board