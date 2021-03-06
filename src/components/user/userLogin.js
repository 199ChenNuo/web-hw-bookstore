import React, {Component} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import $ from 'jquery';
//import { BrowserRouter } from 'react-router';
//import { Switch, Route, Link } from 'react-router-dom';
//import Home from '../home/home';
const FormItem = Form.Item;


export var userdata=new Array();
export var clientLogin=false;
export var Username;
export var clientID;
var Userpass='';
/*
function reloadPage(){
    window.location.reload();
}
*/
class Login extends Component{
    state = {
        username: "",
        userpass:"",
        namevalidateStatus:"",
        passvalidateStatus:"",
        lastvalidateStatus:"",
        nameHelp:"",
        passHelp:"",
        lastHelp:""
    };
    handleUsernameChange = (event) =>{
        this.setState({
            username: event.target.value
        });
        Username=this.state.username;
    };
    handleUserpassChange = (event) =>{
            this.setState({
                userpass: event.target.value
            });
            Userpass=this.state.userpass;
        };
    handleSubmit = (event) =>{
        if(this.state.username == ''){
            this.setState({
                namevalidateStatus: 'error',
                nameHelp:'请输入用户名！'
            });
        }
        else if(this.state.userpass == ''){
            this.setState({
                passvalidateStatus: 'error',
                passHelp:'请输入密码！'
            });
        }
            else{
            
            clientLogin="go to check";
            // BrowserRouter.push('/home');
            //提交表单数据到后端验证
            /*
            var obj = this;
            $.post("/loginAction",{
                username:this.state.username,
                userpass:this.state.userpass
                },
                function(data,status){
                    var returnData = JSON.parse(data);
                if(returnData.infostatus=='T'){
                    obj.setState({
                        lastvalidateStatus:"success",
                        lastHelp:returnData.infomsg
                    });
                    location.href="/antd";
                }
                else {
                    obj.setState({
                        userpass: '',
                        namevalidateStatus:"",
                        passvalidateStatus:"",
                        lastvalidateStatus:"error",
                        nameHelp:"",
                        passHelp:"",
                        lastHelp:returnData.infomsg
                    });
                }
                });
                */
               var name=this.state.username;
               var word=this.state.userpass;
               
                console.log('input valid, begin check in database');
                $.ajax({
                    url:'http://localhost:8080/CheckUser',
                    type: 'get',
                    data: {
                        'username': name,
                        'password': word,
                    },
                    
                    success: function(data){
                        console.log(data);
                        console.log('data from back end',data);
                        if(data == 0){
                            clientLogin=false;
                            console.log('login fail');
                            alert('用户名或密码错误!');
                            //force to jump to '/home'
                        }else{
                            userdata=eval(data);
                            console.log('parsed data:',userdata);
                            clientLogin=true;
                            console.log('login success');
                            alert('登录成功');
                        }
                       
                    }
                })
        }
        console.log('name',name);
        console.log('password',word);
        console.log('clientLogin:',clientLogin);
        event.preventDefault();
    };
    render() {
        return (
            <div style={{width:300,margin:'auto'}}>
                <Form onSubmit={this.handleSubmit}  className="login-form">
                    <h1>欢迎登录</h1>
                    <FormItem validateStatus={this.state.namevalidateStatus} help={this.state.nameHelp}>
                    <Input className="username"  value={this.state.username} onChange={this.handleUsernameChange} prefix={<Icon type="user" style={{ fontSize: 13 }} />}  placeholder="Username" />
                    </FormItem>
                    <FormItem validateStatus={this.state.passvalidateStatus} help={this.state.passHelp}>
                    <Input className="userpass"  value={this.state.userpass} onChange={this.handleUserpassChange}  prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                    </FormItem>
                    <FormItem validateStatus={this.state.lastvalidateStatus} help={this.state.lastHelp}>
                    <div>
                        <Checkbox>记住我</Checkbox>
                        <a className="login-form-forgot" style={{margin:'0px 0px 0px 150px'}}>忘记密码</a>  
                    </div>
                    <div>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{width:300}}>
                            登录
                        </Button>
                        <p>还没有？点击这里<a href='/User/UserRegister'>注册</a></p>
                    </div>
                    </FormItem>
                </Form>
            </div>
        );
    }
};

const LogIn = Form.create()(Login);

export default LogIn;

