import React, {Component} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

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
    };
  handleUserpassChange = (event) =>{
        this.setState({
            userpass: event.target.value
        });
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
         var obj = this;
           //提交表单数据到后端验证
           /*
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
      }

     
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
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{width:300}}>注册</Button>
                </div>
                </FormItem>
            </Form>
        </div>
    );
  }
};

const LogIn = Form.create()(Login);

export default LogIn;

/*
<FormItem validateStatus={this.state.namevalidateStatus} help={this.state.nameHelp}>
              <Input className="username"  value={this.state.username} onChange={this.handleUsernameChange} prefix={<Icon type="user" style={{ fontSize: 13 }} />}  placeholder="Username" />
              </FormItem>
              <FormItem validateStatus={this.state.passvalidateStatus} help={this.state.passHelp}>
              <Input className="userpass"  value={this.state.userpass} onChange={this.handleUserpassChange}  prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
              </FormItem>
              <FormItem validateStatus={this.state.lastvalidateStatus} help={this.state.lastHelp}>
              <Checkbox>记住我</Checkbox>*/
