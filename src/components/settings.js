import React, {Component} from 'react';
import { Form, Input, Select, Checkbox, Button } from 'antd';

import './style.css';
import { clientLogin } from './login';
const FormItem = Form.Item;
const Option = Select.Option;


export var EXUserName='我';

class SettingsForm extends Component{

    state = {
        userName:'',
        userEmail:'',
        userPhone:'',
        userPassword:'',
        confirmDirty: false,
        autoCompleteResult: [],
    }

    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                alert("修改成功");
                console.log('修改成功 value: ', values);
                EXUserName: this.state.userName;
            }
        });
        
    }
    changeUserName = (event) => {
        console.log('change user name');
        userName: event.target.value;
    }
    changeEmail = (event) => {
        console.log('change user E-mail');
        this.setState({userEmail: event.target.value});
    }
    changePhone = (event) => {
        console.log('change user phone number');
        this.setState({userPhone: event.target.value});
    }
    changePassword = (event) => {
        console.log('change user password');
        this.setState({userPassword: event.target.value});
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不同！');
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
    };
    

    render(){
    
    const { getFieldDecorator } = this.props.form;

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

    const content = (
        clientLogin ?
        <div id="modify-info">
        <Form onSubmit={this.handleSubmit}>
        <FormItem
        {...formItemLayout}
        label="昵称"
        >
        {getFieldDecorator('nickName', {
            rules: [{ required: true, message: '请输入新的用户名', whitespace: true }],
        })(
            <Input onChange={this.changeUserName}/>
        )}
        </FormItem>
        <FormItem
        {...formItemLayout}
        label="E-mail"
        >
        {getFieldDecorator('email', {
            rules: [{
            type: 'email', message: '输入非法邮箱',
            }, {
            required: true, message: '输入邮箱地址',
            }],
        })(
            <Input/>
        )}
        </FormItem>
        <FormItem
        {...formItemLayout}
        label="Password"
        >
        {getFieldDecorator('password', {
            rules: [{
            required: true, message: '输入新密码',
            }, {
            validator: this.validateToNextPassword,
            }],
        })(
            <Input type="password" />
        )}
        </FormItem>
        <FormItem
        {...formItemLayout}
        label="Confirm Password"
        >
        {getFieldDecorator('confirm', {
            rules: [{
            required: true, message: '再次输入以确定密码',
            }, {
            validator: this.compareToFirstPassword,
            }],
        })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
        )}
        </FormItem>
        <FormItem
        {...formItemLayout}
        label="Phone Number"
        >
        {getFieldDecorator('phone', {
            rules: [{ required: true, message: '修改手机号' }],
        })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
        )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
        {getFieldDecorator('agreement', {
            valuePropName: 'checked',
        })(
            <Checkbox>I have read the <a href="">agreement</a></Checkbox>
        )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">确认</Button>
        </FormItem>
        </Form>
        </div>
        :
        <p>
                请先登录
            </p>
    )
    return(
        <div style={{width:500, textAlign:'center',float:'center'}}>
            { content }
        </div>
    )
    }
}

const Settings = Form.create()(SettingsForm);


export default Settings;