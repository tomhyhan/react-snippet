import  React from 'react';

export const themes = {
    red: "red",
    green: "green"
  };
  
export const ThemeContext = React.createContext({
    theme: themes.green,
    toggleTheme: ()=>{}
})
  