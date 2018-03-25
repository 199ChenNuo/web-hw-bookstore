import React, {Component} from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import Home from './home/home';
import LogIn from './login/login';
import ShoppingCar from './shoppingcar/shoppingcar';
import Catalogue from './catalogue/catalogue';
import User from './user/user';
import Order from './order/order';
import Register from './register/register';
import AdminLogIn from './adminLogin/adminLogin';
import { client } from './login/login';
import { admin } from './adminLogin/adminLogin';

var reloadTime=false;

class Index extends Component{
    
    render(){
        console.log(client);
        return (
            <div class="tab">
                <header>
                    <h1 id="header-banner">线上书店</h1>
                </header>
              <div>
                <Row>
                    <Col span="2" offet="8">
                        <Link tag="home" to="/home">
                        <a>首页</a>
                        </Link>
                    </Col>
                    
                    <div>
                    <Col span="2">
                        <Link tag='catalogue' to='/catalogue'>
                        <a>书城</a>
                        </Link>
                    </Col>
                        <Col span="2">
                        <Link tag="shoppingcar" to="/shoppingcar">
                        <span>购物车</span>
                        </Link>
                    </Col>
                    <Col span="1" offset="12">
                        <Link tag='user' to="/user">
                        <span>我的</span>
                        </Link>
                    </Col>
                    </div>
                   
                    <div>
                    <Col span="1">
                        <Link tag="login" to="/login">
                        <span>登录</span>
                        </Link>
                    </Col>
                    <Col span="1">
                        <Link tag="adminLogin" to="/adminLogin">
                        <span>管理员</span>
                        </Link>
                    </Col>
                    <Col span="1">
                        <Link tag='register' to="/register">
                        <span>注册</span>
                        </Link>
                    </Col>
                    </div>
                </Row>
              </div>
              
              <Switch> 
                <Route exact path='/' component={LogIn}/>
                <Route path='/home' component={Home}/>
                <Route path='/catalogue' component={Catalogue}/>
                <Route path='/shoppingcar' component={ShoppingCar}/>
                <Route path='/register' component={Register}/>
                <Route path='/login' component={LogIn}/>
                <Route path='/adminLogin' component={AdminLogIn}/>
                <Route path='/user' component={User}/>
              </Switch>
              
            </div>
        )
    }
}

export default Index;