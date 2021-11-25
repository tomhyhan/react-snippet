import React from 'react';
import {Squares} from '../App'

interface GameButtonProps {
  step?: {squares: Squares};
  move: number;
  onClick: () => void
}
const Button = ({ move, onClick }: GameButtonProps) => {
  const desc = move ? `Go to move #${move}` : 'Go to game';
  const handleClick = () => {
    onClick();
  };

  return (
    <li>
      <button onClick={handleClick}>{desc}</button>
    </li>
  );
};

export default Button;
