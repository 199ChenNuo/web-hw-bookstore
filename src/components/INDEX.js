import React, {Component} from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import Home from './guide/home'
import LogIn from './guide/login'
import ShoppingCar from './guide/shoppingcar'
import Catalogue from './guide/catalogue'
import User from './guide/user'
import Order from './guide/order'

class Index extends Component{
    render(){
        return (
            <div class="tab">
              <div>
                <ul class="rowUl">
                    <li>
                        <Link tag="home" to="/home">
                        <span>首页</span>
                        </Link>
                    </li>
                    <li>
                        <Link tag="login" to="/lgoin">
                        <span>登录</span>
                        </Link>
                    </li>
                    <li>
                        <Link tag='user' to="/user">
                        <span>我的</span>
                        </Link>
                    </li>
                    <li>
                        <Link tag='catalogue' to='/catalogue'>
                        <span>书城</span>
                        </Link>
                    </li>
                </ul>
              </div>
              
              <Switch> 
                <Route exact path='/' component={Home}/>
                <Route path='/home' component={Home}/>
                <Route path='/login' component={LogIn}/>
                <Route path='/user' component={User}/>
                <Route path='/catalogue' component={Catalogue}/>
              </Switch>
              
            </div>
        )
    }
}

export default Index;