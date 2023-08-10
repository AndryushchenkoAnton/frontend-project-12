import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import localeInit from './init.jsx';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const html = document.getElementsByTagName('html')[0];
  html.setAttribute('class', 'h-100');
  const rootDiv = document.querySelector('#root');
  rootDiv.classList.add('h-100');
  document.body.classList.add('h-100', 'bg-light');

  root.render(await localeInit());
};

app();
reportWebVitals();
