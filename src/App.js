import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,IndexRoute,hashHistory} from 'react-router';
import Button from 'antd/lib/button';
import Index from './components/router';
import {BrowserRouter} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import Background from './components/images/boat.jpg';

const homeImage = {
    width: "100%",
    height: "100%",
    
    //background-size:100% 100%，
    // makesure here is String确保这里是一个字符串，以下是es6写法
    backgroundImage: `url(${Background})` 
}

class App extends Component {
  render() {
      return (
        <div class="header">
            <div className="App" class="bk">     
                <BrowserRouter>
                    <Index />
                </BrowserRouter>
                </div>
            </div>
      )
  }
}

export default App;

