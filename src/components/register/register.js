import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class Register extends Component {
    constructor(props){
        super(props);
        this.state = { // 初始化state
            username: '',
            password: ''
        }
    }
  　stateChange(e){
  　　   const target = e.target;
         this.setState({
             [target.name]: target.value
         })
  　}
    saveUser() {
        const {
            username,
            password
        } = this.state;
        if(!username) return alert('用户名不能为空');
        if(!password) return alert('密码不能为空');
    }
    render() {
      return (
        <div onChange={(e)=>this.stateChange(e)}>
            <input name="username" value={this.state.username} placeholder="请输入用户名"/>
            <input name="password" value={this.state.password} placeholder="请输入密码"/>
            <button onClick={()=>this.saveUser()}>立即注册</button>
        </div>
      );
    }
  }

export default Register;