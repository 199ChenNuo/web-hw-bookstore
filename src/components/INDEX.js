import React, {Component} from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import Home from './home/home'
import LogIn from './login/login'
import ShoppingCar from './shoppingcar/shoppingcar'
import Catalogue from './catalogue/catalogue'
import User from './user/user'
import Order from './order/order'
import Register from './register/register'

class Index extends Component{
    render(){
        return (
            <div class="tab">
                <header>
                    <h1 id="header-banner">待替换， 线上书店</h1>
                </header>
              <div>
                <ul class="rowUl" >
                    <li class="rowLi">
                        <Link tag="home" to="/home">
                        <span>首页</span>
                        </Link>
                    </li>
                    
                    <li class="rowLi">
                        <Link tag='catalogue' to='/catalogue'>
                        <span>书城</span>
                        </Link>
                    </li>
                    <li class="rowLi">
                        <Link tag="shoppingcar" to="/shoppingcar">
                        <span>购物车</span>
                        </Link>
                    </li>
                    <li class="rowLi">
                        <Link tag='user' to="/user">
                        <span>我的</span>
                        </Link>
                    </li>
                    <li class="rowLi">
                        <Link tag="login" to="/lgoin">
                        <span>登录</span>
                        </Link>
                    </li>
                    <li class="rowLi">
                        <Link tag='register' to="/register">
                        <span>注册</span>
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
                <Route path='/shoppingcar' component={ShoppingCar}/>
                <Route path='/register' component={Register}/>
              </Switch>
              
            </div>
        )
    }
}

export default Index;