import React, {Component} from 'react';
import { Form, Select, Popconfirm, Input, Icon, Button, Spin, Table } from 'antd';import '../style.css';
import { clientLogin, clientID, userdata } from './userLogin';
import $ from 'jquery';
const FormItem = Form.Item;
const Option = Select.Option;


export var EXUserName='我';

var data = new Array();




const EditableCell = ({ editable, value, onChange }) => (
    <div>
      {editable
        ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
        : value
      }
    </div>
  );


class Settings extends Component{

     constructor(props) {
        super(props);
        this.columns = [{
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
            sorter: (a,b) => a.ID-b.ID,
          },{
            title: '用户名',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => this.renderColumns(text, record, 'name'),
          },{
            title: '密码',
            dataIndex: 'password',
            key: 'password',
            render: (text, record) => this.renderColumns(text, record, 'password'),
          },{
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b)=>a.price-b.price,
            render: (text, record) => this.renderColumns(text, record, 'email'),
          },{
            title: '手机号码',
            dataIndex: 'phone',
            key: 'phone',
            sorter: (a, b)=>a.year-b.year,
            render: (text, record) => this.renderColumns(text, record, 'phone'),
          },{
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record) => {
                const { editable } = record;
                return (
                <div className="editable-row-operations">
                    {
                    editable ?
                        <span>
                        <a onClick={() => this.save(record.key)}>Save</a>
                        <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                            <a>Cancel</a>
                        </Popconfirm>
                        </span>
                        : <a onClick={() => this.edit(record.key)}>Edit</a>
                    }
                </div>
                );
            },
          },];
        this.state = { userdata };
        this.cacheData = userdata.map(item => ({ ...item }));
      }

      componentWillMount = () =>{
          console.log('userdata',userdata);
          console.log('datasource ',this.state.data);
          this.setState({
              data: userdata,
          });
          console.log('datasource ',this.state.data);
      }
      renderColumns(text, record, column) {
        return (
          <EditableCell
            editable={record.editable}
            value={text}
            onChange={value => this.handleChange(value, record.key, column)}
          />
        );
      }
      handleChange(value, key, column) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target[column] = value;
          this.setState({ data: newData });
        }
      }
      edit(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target.editable = true;
          this.setState({ data: newData });
        }
      }
      save(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        console.log('book info after modify ',target);
        console.log('ID:',target.ID)
        if (target) {
            delete target.editable;
            this.setState({ data: newData });
            this.cacheData = newData.map(item => ({ ...item }));
            $.ajax({
                url:'http://localhost:8080/ModifyUser',
                type: 'GET',
                data: 
                {   'id': userdata[0].ID,
                    'name': userdata[0].name,
                    'password': userdata[0].password,
                    'email' : userdata[0].email,
                    'phone': userdata[0].phone,
                },
                success: function(data){
                    console.log('modify success',data);
                    alert('修改成功！');
                }
            })
        }
      }
      cancel(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
          delete target.editable;
          this.setState({ data: newData });
        }
      }
      /*
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            
            console.log('values',values);
            console.log('userdata ',userdata[0]);
            console.log('user id ',userdata[0].ID);
            if (!err) {
                EXUserName: this.state.userName;
                $.ajax({
                    url:'http://localhost:8080/db/ModifyUser',
                    type: 'GET',
                    data: 
                    {   'ID': userdata[0].ID,
                        'username': userdata[0].username,
                        'password': userdata[0].userpass,
                        'email' : userdata[0].email,
                        'phone': userdata[0].phone,
                    },
                    success: function(data){
                        console.log('modify success',data);
                        alert('修改成功！');
                    }
                })
            }
        });
        
    }
    */
   /*
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
    */
    render(){
        const content = (
            clientLogin ?
            <Table bordered dataSource={this.state.data} columns={this.columns} />
              :
              <p>
              请登录
              </p>
        )
        return(
            <div>
                { content }
            </div>
        )
    }
}

export default Settings;