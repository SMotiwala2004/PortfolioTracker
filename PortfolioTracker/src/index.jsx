import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main'

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root') // Ensure this ID exists in index.html
);
