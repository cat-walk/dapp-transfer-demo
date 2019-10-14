import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'antd-mobile/dist/antd-mobile.css';

import routes from './routes';
import './App.css';
import './style/common.css';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>{routes}</BrowserRouter>
    </div>
  );
}

export default App;
