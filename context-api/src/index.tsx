import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

export const themes = {
  red: "red",
  green: "green"
};

export const ThemeContext = React.createContext(themes.green)


ReactDOM.render(
  <React.StrictMode>
    <ThemeContext.Provider value={themes.red}>
    <App />
    </ThemeContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
