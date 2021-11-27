import React, {useContext} from 'react';
import { ThemeContext } from '../context/theme-context';


const ThemeToggleComponent = () => {
    const theme = useContext(ThemeContext)
    return (
        <button onClick={theme.toggleTheme}>
            toggle from childe
        </button>
    );
};

export default ThemeToggleComponent;