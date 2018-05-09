import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
//import {BrowserRouter} from 'react-router-dom';
import { Upload, message, Layout, Menu, Breadcrumb, Icon } from 'antd';
//import MenuItem from 'antd/lib/menu/MenuItem';

import Catalogue from './catalogue';
import User from './user';
import Home from './home';
import ShoppingCar from './shoppingcar';
import Settings from './settings';
import Register from './register';
import AdminRegister from './adminRegister';
import LogIn from './login';
import AdminLogIn from './adminLogin';
import ModifyBooks from './modifyBooks';
import Agreement from './agreement';
import UserAgreement from './userAgreement';
import AddBooks from './addBooks';
import DelBooks from './delBooks';
import Order from './order';

import { adminLogin } from './adminLogin';
import { clientLogin } from './login';

import './style.css';
import * as styles from './style.less';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

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

  handleChange = (info) => {
      console.log('info',info);
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }

  handleMenuOnClick = (e) => {
    this.setState({current: e.key});
    console.log('click at',e.key);
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imgColladpse = (
      this.state.collapsed ? 
        <Menu.Item>
          <Icon type="user" />
          <span>我</span>
        </Menu.Item>
             :       
        <div id='user-header'>
          <Upload
            style={{margin:'0 auto',textAlign:'center',verticalAlign:'middle'}}
            name="avatar"
            listType="picture-card"
            //class="user-header"
            className="avatar-uploader"
            showUploadList={false}
            action="//jsonplaceholder.typicode.com/posts/"
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
          </Upload>
        </div>
    )
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
    const imageUrl = this.state.imageUrl;
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
            
          
           { imgColladpse }
            

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
          title={<span><Icon type="form" /><span>管理图书</span></span>}
          >
            <Menu.Item>
              <Link to='/Admin/ModifyBooks'>
              <Icon type="form" />
              <span>更改图书库存</span>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/Admin/AddBooks'>
              <Icon type="form" />
              <span>添加图书</span>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/Admin/DelBooks'>
              <Icon type="form" />
              <span>删除图书</span>
              </Link>
            </Menu.Item>
            </SubMenu>
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
                <Route path='/Admin/ModifyBooks' component={ModifyBooks} />
                <Route path='/Admin/AddBooks' component={AddBooks} />
                <Route path='/Admin/DelBooks' component={DelBooks} />
                <Route path='/Admin/AdminRegister' component={AdminRegister} />
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