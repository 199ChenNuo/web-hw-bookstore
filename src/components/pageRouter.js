import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
//import {BrowserRouter} from 'react-router-dom';
import { Upload, message, Layout, Menu, Breadcrumb, Icon } from 'antd';
//import MenuItem from 'antd/lib/menu/MenuItem';

import Catalogue from './catalogue';
import Home from './home';
import Agreement from './agreement';

import User from './user/user';
import ShoppingCar from './user/shoppingcar';
import Settings from './user/settings';
import Register from './user/userRegister';
import LogIn from './user/userLogin';
import UserAgreement from './user/userAgreement';
import Order from './user/userOrder';
import { clientLogin } from './user/userLogin';

import AdminRegister from './admin/adminRegister';
import AdminLogIn from './admin/adminLogin';
import ModifyBooks from './admin/adminModifyBooks';
import AddBooks from './admin/adminAddBooks';
import ModifyUser from './admin/adminModifyUser';
import AdminSales from './admin/adminSales';
import { adminLogin } from './admin/adminLogin';


import './style.css';
import * as styles from './style.less';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;



class PageRouter extends Component {
  state = {
    collapsed: false,
    loading: false,
    current:'home'
  };

  onCollapse = (e) => {
      console.log('e',e);
      console.log('collapsed',this.state.collapsed);
      
    if(this.state.collapsed){
      this.setState({collapsed:false});
      console.log('open menu');
    }else{
      this.setState({collapsed:true});
      console.log('close menu');
    }
    
};

 

  handleMenuOnClick = (e) => {
    this.setState({current: e.key});
    console.log('click at',e.key);
  };

  render() {
    
    const userOrAdmin = (
      adminLogin && !clientLogin ?
        <Menu.Item>
          <Link to='/Admin/ModifyBooks'>
          <Icon type="form" />
          <span>管理图书</span>
          </Link>
        </Menu.Item>
        :
        <SubMenu
          key="user"
          title={<span><Icon type="solution" /><span>我的</span></span>}
        >
          <Menu.Item key="userinfo">
            <Link to='/User/Userinfo'>
              <Icon type='user' />
              <span>个人信息</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="shoppingcar">
            <Link to='/User/shoppingcar'>
              <Icon type="shopping-cart" />
              <span>购物车</span>
            </Link>
            </Menu.Item>
          <Menu.Item key="order">
            <Icon type='book' />
            <span>历史订单</span>
          </Menu.Item>
        </SubMenu>

    )
    const loginOrNot = (
      !adminLogin && !clientLogin ?
      <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>登录/注册</span></span>}
            >
              <Menu.Item key="6">
              <Link to='/User/UserLogin'>
              <span>
              <Icon type='user' />
              <span>
              登录
              </span>
              </span>
              </Link>
              </Menu.Item>

              <Menu.Item key="7">
              <Link to='/Admin/AdminLogin'>
              <span>
              <Icon type='user' />
              <span>
              管理员登录
              </span>
              </span>
              </Link>
              </Menu.Item>

              <Menu.Item key="8">
              <Link to='/User/UserRegister'>
              <span>
              <Icon type='user-add' />
              <span>
              注册
              </span>
              </span>
              </Link>
              </Menu.Item>

                
              <Menu.Item>
                <Link to='/Admin/AdminRegister'>
                <Icon type='user-add' />
                <span>管理员注册</span>
                </Link>
              </Menu.Item>

      </SubMenu>
              :

              userOrAdmin
    )
    return (
      <div>
        <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            
            <Menu.Item key="home">
              <Link to='/Home'>
                <Icon type="home" />
                <span>首页</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="catalogue">
              <Link to='/Catalogue'>
                <Icon type="shop" />
                <span>书城</span>
              </Link>
            </Menu.Item>

          <SubMenu key='admin'
          title={<span><Icon type="form" /><span>管理</span></span>}
          >
            <Menu.Item>
              <Link to='/Admin/ModifyBooks'>
              <Icon type="form" />
              <span>库存管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/Admin/AddBooks'>
              <Icon type="form" />
              <span>添加图书</span>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/Admin/ModifyUsers'>
              <Icon type="form" />
              <span>用户管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/Admin/Sales'>
              <Icon type="form" />
              <span>销售统计</span>
              </Link>
            </Menu.Item>
            </SubMenu>
            <SubMenu
              key="user"
              title={<span><Icon type="solution" /><span>信息维护</span></span>}
            >
              <Menu.Item key="userinfo">
               <Link to='/User/Userinfo'>
                 <Icon type='user' />
                 <span>个人信息</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="shoppingcar">
               <Link to='/User/shoppingcar'>
                 <Icon type="shopping-cart" />
                 <span>购物车</span>
                </Link>
               </Menu.Item>
              <Menu.Item key="order">
              <Link to='/User/Order'>
                <Icon type='book' />
                <span>历史订单</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="setting">
              <Link to='/User/settings'>
                <Icon type="form" />
                <span>修改个人信息</span>
              </Link>
              </Menu.Item>
            </SubMenu>
    
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>登录/注册</span></span>}
            >
              <Menu.Item key="6">
              <Link to='/User/UserLogin'>
              <span>
              <Icon type='user' />
              <span>
              登录
              </span>
              </span>
              </Link>
              </Menu.Item>

              <Menu.Item key="7">
              <Link to='/Admin/AdminLogin'>
              <span>
              <Icon type='user' />
              <span>
              管理员登录
              </span>
              </span>
              </Link>
              </Menu.Item>

              <Menu.Item key="8">
              <Link to='/User/UserRegister'>
              <span>
              <Icon type='user-add' />
              <span>
              注册
              </span>
              </span>
              </Link>
              </Menu.Item>

              <Menu.Item>
                <Link to='/Admin/AdminRegister'>
                <Icon type='user-add' />
                <span>管理员注册</span>
                </Link>
              </Menu.Item>
   
            </SubMenu>
            
      


          </Menu>
        </Sider>
        <Layout>
          <Header style={{background:'#fff'}}>
            <div className={styles['header']}>
            岛上书店
            </div>
          </Header>
          <Content style={{ margin: '0 16px' }}>
           
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
            
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                <Route exact path='/' component={Home} />
                <Route path='/Home' component={Home}/>
                <Route path='/User/Userinfo' component={User}/>
                <Route path='/Catalogue' component={Catalogue}/>
                <Route path='/User/shoppingcar' component={ShoppingCar}/>
                <Route path='/User/settings' component={Settings} />
                <Route path='/User/UserRegister' component={Register} />
                <Route path='/User/UserLogin' component={LogIn} />
                <Route path='/Admin/AdminLogin' component={AdminLogIn} />
                <Route path='/Admin/ModifyUsers' component={ModifyUser} />
                <Route path='/Admin/ModifyBooks' component={ModifyBooks} />
                <Route path='/Admin/AddBooks' component={AddBooks} />
                <Route path='/Admin/AdminRegister' component={AdminRegister} />
                <Route path='/Admin/Sales' component={AdminSales} />
                <Route path='/Agreement' component={Agreement} />
                <Route path='/User/Agreement' component={UserAgreement} />
                <Route path='/User/Order' component={Order} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>

        
        </Layout>
      </Layout>
      </div>
    );
  }
}

/*
<Breadcrumb style={{ margin: '16px 0' }}>
  <Breadcrumb.Item>User</Breadcrumb.Item>
  <Breadcrumb.Item>Bill</Breadcrumb.Item>
</Breadcrumb>
*/

export default PageRouter;