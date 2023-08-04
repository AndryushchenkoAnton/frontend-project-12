import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const html = document.getElementsByTagName('html')[0];
html.setAttribute('class', 'h-100');
const rootDiv = document.querySelector('#root');
rootDiv.classList.add('h-100');
document.body.classList.add('h-100', 'bg-light');

root.render(

  <React.StrictMode>
    <App />
  </React.StrictMode>,

);

reportWebVitals();
