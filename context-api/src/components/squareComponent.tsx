import React, {memo, useContext} from 'react';
import {ThemeContext} from '../context/theme-context'

type Next = 'O' | 'X' | null
export type Squares = Next[]

interface BoardProps {
    value: Next;
    onClick: () => void
  }
  

  const Square = memo(({ value, onClick }: BoardProps) => {
    const theme = useContext(ThemeContext) // consumer
    const handleClick = () => {
      onClick();
    };
    return (
      <button onClick={handleClick} className='square' style={{borderColor: theme.theme}}>
        {value}
      </button>
    );
  });

export default Square