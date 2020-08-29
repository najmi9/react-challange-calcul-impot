import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
/**
 *   // return le prix qu'il faut partient pour une reste tapé après l'impot 
  const calculRevenu = (rest, NbP) => {
    let myRevenu = 0;
    rest = rest/NbP;
    if (rest <= T1) {

       myRevenu = rest;

    } else if (T1 < rest && rest <= (T2-L1)) { // dans cet interval l'mposition = 0.11
    
       myRevenu = ((rest -(T1 + 1) * 0.11) / (1 - 0.11));
      // myRevenu = 2 * rest - NbP * 0.11 * (T1+1);

    } else if ((T2 - L1) < rest && rest <= (T3 - L2 -L1)) {

       myRevenu = (rest + L1 - 0.3 * (T2 + 1)) / (1 - 0.3);

    } else if ((T3 - L2 - L1) < rest && rest <= (T4 - L3 - L2 - L1)) {

       myRevenu = (rest + L1 + L2 - 0.41 * (T3 + 1)) / (1 - 0.41);// deduit à partir de relation(2)
    
    } else if ((T4 - L3 - L2 - L1) < rest) {

       myRevenu = (rest + L1 + L2 + L3 - 0.45 * (T4 + 1)) / (1 - 0.45);// deduit à partir de relation(2)
   
    }
    return myRevenu;
  }
 */