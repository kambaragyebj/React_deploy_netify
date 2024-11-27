import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import store from './store';

// the store will provide states for the entire application
ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <Router>
        <Route path="/"  component={App} />
      </Router>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
