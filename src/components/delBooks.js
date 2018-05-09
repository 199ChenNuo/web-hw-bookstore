import React, { Component } from 'react';
import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import $ from 'jquery';
import { data } from './catalogue';
import { adminLogin } from './adminLogin';

import './style.css';
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

class DelBooks extends Component{
    constructor(props) {
        super(props);
        this.columns = [{
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
            sorter: (a,b) => a.ID-b.ID,
          },{
            title: '书名',
            dataIndex: 'name',
            key: 'name',
          },{
            title: '作者',
            dataIndex: 'author',
            key: 'author',
            
          },{
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b)=>a.price-b.price,
            
          },{
            title: '出版年份',
            dataIndex: 'year',
            key: 'year',
            sorter: (a, b)=>a.year-b.year,
            
          },{
          title: '库存',
          dataIndex: 'storage',
          key: 'storage',
          sorter: (a, b)=> a.storage-b.storage,
          
          },{
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record) => {
                return (
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                      <a href="javascript:;">Delete</a>
                    </Popconfirm>
                );
              },
          },];  
    
        this.state = {
            data
        }
    }
    onDelete = (key) => {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        console.log('data:',data);
        /*
        let dataLen = data.length;
        for(let i=0; i<dataLen; i++){
            if(data[i].ID ==target.ID){
                data.splice(i,1);
                break;
            }
        }
        console.log('data:',data);
        window.location.href='#';
        */
       if(target){
            $.ajax({
                url:'http://localhost:8080/db/DelBooks',
                type: 'GET',
                data: 
                {   
                    'ID': target.ID,
                },
                success: function(data){
                    console.log('delete success',data);
                    alert('删除成功！');
                }
            })
            window.location.href='#';
       }
    }
    componentWillMount = () => {
        console.log('data:',data);
    }
    render(){
        const columns = this.columns;
        const content = (
            adminLogin  ?
            <div>
            <Table bordered dataSource={this.state.data} columns={columns} />
            </div>
            :
            <p>
                请先登录！
            </p>
        )
        return (
            
            <div>
                { content }
            </div>
        )
    }
}

export default DelBooks;