import React, {Component} from 'react';
import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import $ from 'jquery';
import { adminLogin } from './adminLogin';

var data = new Array();


const EditableCell = ({ editable, value, onChange }) => (
    <div>
      {editable
        ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
        : value
      }
    </div>
);

/*
class EditableCell extends React.Component {
    state = {
      value: this.props.value,
      editable: false,
    }
    handleChange = (e) => {
      const value = e.target.value;
      this.setState({ value });
    }
    check = () => {
      this.setState({ editable: false });
      if (this.props.onChange) {
        this.props.onChange(this.state.value);
      }
    }
    edit = () => {
      this.setState({ editable: true });
    }
    render() {
      const { value, editable } = this.state;
      return (
        <div className="editable-cell">
          {
            editable ?
              <div className="editable-cell-input-wrapper">
                <Input
                  value={value}
                  onChange={this.handleChange}
                  onPressEnter={this.check}
                />
                <Icon
                  type="check"
                  className="editable-cell-icon-check"
                  onClick={this.check}
                />
              </div>
              :
              <div className="editable-cell-text-wrapper">
                {value || ' '}
                <Icon
                  type="edit"
                  className="editable-cell-icon"
                  onClick={this.edit}
                />
              </div>
          }
        </div>
      );
    }
}
*/

class ModifyUser extends Component{
    constructor(props) {
        super(props);
        this.columns = [{
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
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
            title: '手机号码',
            dataIndex: 'phone',
            key: 'phone',
            render: (text, record) => this.renderColumns(text, record, 'phone'),

        },{
            title: '邮箱地址',
            dataIndex: 'email',
            key: 'email',
            render: (text, record) => this.renderColumns(text, record, 'email'),

        },{
            title: '修改',
            dataIndex: 'modify',
            render: (text, record) => {
                const { editable } = record;
                return (
                <div className="editable-row-operations">
                    {
                    editable ?
                        <span>
                        <a onClick={() => this.save(record.key)}>Save  </a>
                        <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                            <a>Cancel</a>
                        </Popconfirm>
                        </span>
                        : <a onClick={() => this.edit(record.key)}>Edit</a>
                    }
                </div>
                );
            },
        },{
            title: '删除',
            dataIndex: 'delete',
            render: (text, record) => {
                return (
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                      <a href="javascript:;">Delete</a>
                    </Popconfirm>
                );
              },
        }];
        this.state = { data };
        this.cacheData = data.map(item => ({ ...item }));
    }
    componentWillMount = () => {
        $.ajax({
            url:'http://localhost:8080/AllUsers',
            type: 'GET',
            async:false,
            success: function(users){
              console.log(users);
              
              data=eval(users);
              
              console.log('get users success',data);
              window.location.href='#';
              
            }
        })
        this.setState({
            data: data,
        })
    }
    onDelete = (key) => {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        console.log('data:',data);
        if(target){
            $.ajax({
                url:'http://localhost:8080/DeleteUser',
                type: 'GET',
                data: 
                {   
                    'ID': target.ID,
                },
                success: function(data){
                   console.log('delete user: ',data);
                   alert('删除成功');
                }
            })
            window.location.href='#';
        }
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
        console.log('user info after modify ',target);
        console.log('user ID:',target.ID)
        if (target) {
            delete target.editable;
            this.setState({ data: newData });
            this.cacheData = newData.map(item => ({ ...item }));
            console.log('target',target);
            console.log('target.ID',target.ID);
            console.log('name',target.name);
            $.ajax({
                url:'http://localhost:8080/ModifyUser',
                type: 'GET',
                data: 
                {   
                    'id': target.ID,
                    'name': target.name,
                    'password': target.password,
                    'phone' : target.phone,
                    'email':target.email,
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
    render() {
        const content = (
          adminLogin ?
          <Table bordered dataSource={this.state.data} columns={this.columns} />
          :
          <p>
          请登录
          </p>
      );
        return(
          <div>
             { content }
          </div>
        );
      }
}

export default ModifyUser;
