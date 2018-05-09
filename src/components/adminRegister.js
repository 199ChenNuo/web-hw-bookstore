import React, {Component} from 'react';
import { Form, Input, Tooltip, Icon, Select, Checkbox, Button, AutoComplete } from 'antd';
import $ from 'jquery';

const FormItem = Form.Item;
const Option = Select.Option;
const adminPass='admin';
var IsAdmin=false;

class AdminRegistrationForm extends Component{
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
      };
      handleSubmit = (e) => {
        alert('ti jiao shu ju');
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            if(values.admin != 'admin'){
              alert('错误密钥');
              return;
            }
            console.log('Received values of form: ', values);
            $.ajax({
              url:'http://localhost:8080/db/AddAdmin',
              type: 'GET',
              data: 
              {  
                  'adminname': values.nickname,
                  'password': values.password,
                  'email' : values.email,
                  'phone': values.phone,
              },
              success: function(data){
                  console.log('register success');
                  alert('注册成功！');
              }
          })
          }
        });
      }
      handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
      }
      compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('两次输入的密码不同!');
        } else {
          callback();
        }
      }
      validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
      /*
      compareAdminPass = (rule, value, callback) => {
        console.log('input adminPass: ',value);
        if(value != adminPass){
          console.log('wrong adminpass');
          //alert('错误密钥!');
        }else{
          console.log('is admin');
          IsAdmin=true;
        }
        
      }
      */
      /*
      handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
          autoCompleteResult = [];
        } else {
          autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
      }
      */
      render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;
    
        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
          },
        };
        const tailFormItemLayout = {
          wrapperCol: {
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: 16,
              offset: 8,
            },
          },
        };
        const prefixSelector = getFieldDecorator('prefix', {
          initialValue: '86',
        })(
          <Select style={{ width: 70 }}>
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
          </Select>
        );
    
        /*
        const websiteOptions = autoCompleteResult.map(website => (
          <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
        */
    
        return (
          <div style={{width:500,margin:'auto'}}>
              <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="邮箱地址"
            >
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: '输入非法邮箱地址!',
                }, {
                  required: true, message: '请输入邮箱地址!',
                }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="密码"
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: '请输入密码!',
                }, {
                  validator: this.validateToNextPassword,
                }],
              })(
                <Input type="password" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="确认密码"
            >
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: '再次输入以确认密码',
                }, {
                  validator: this.compareToFirstPassword,
                }],
              })(
                <Input type="password" onBlur={this.handleConfirmBlur} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  管理员密钥&nbsp;
                  <Tooltip title="注册成为管理员需要特殊密钥证明你的身份">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              )}
            >
              {getFieldDecorator('admin', {
                rules: [{ 
                  required: true, message: '管理员密钥', whitespace: true 
                },{
                  validator: this.compareAdminPass,
                }],
              })(
                <Input type="password" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  昵称&nbsp;
                  <Tooltip title="这将是你在本书店的昵称">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              )}
            >
              {getFieldDecorator('nickname', {
                rules: [{ required: true, message: '昵称', whitespace: true }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="手机号码"
            >
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: '手机号码' }],
              })(
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
              )}
            </FormItem>
            
            <FormItem {...tailFormItemLayout}>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(
                <Checkbox>我已阅读 <a href="/agreement">声明</a></Checkbox>
              )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">注册</Button>
            </FormItem>
          </Form>

          </div>
        );
      }
}

const AdminRegister = Form.create()(AdminRegistrationForm);

export default AdminRegister;