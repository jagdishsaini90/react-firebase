import React from 'react';
import Main from './components/MainComp.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigStore } from './redux/configStore';
import './App.css';

const store = ConfigStore();

function App() {
  return (
        <Provider store={store}>
          <BrowserRouter>
            <Main  />
          </BrowserRouter>
        </Provider>
  );
}

export default App;
