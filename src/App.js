import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,IndexRoute,hashHistory} from 'react-router';
import Button from 'antd/lib/button';
import Index from './components/router';
import {BrowserRouter} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';

class App extends Component {
  render() {
      return (
            <div className="App">
                <BrowserRouter>
                <Index />
                </BrowserRouter>
            </div>
      )
  }
}

export default App;

