import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,IndexRoute,hashHistory} from 'react-router';
import {BrowserRouter} from 'react-router-dom';

import PageRouter from './components/pageRouter'

import './App.css';
import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <PageRouter />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
