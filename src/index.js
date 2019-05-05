import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Fireflies from './components/Fireflies';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Fireflies />,
  document.getElementById('root')
);

serviceWorker.register();
