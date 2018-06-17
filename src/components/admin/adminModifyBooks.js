import React, {Component} from 'react';
import { Table, Input, Popconfirm, Button, Icon } from 'antd';
import { data } from '../catalogue'
import { adminLogin } from './adminLogin';

import $ from 'jquery';
var adminBook = new Array();
function handleSubmit(){
    console.log('submit');
}
/*
const EditableCell = ({ editable, value, onChange }) => (
    <div>
        <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
    </div>
);
*/
/*
{editable
    ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
    : value
}
*/

const EditableCell = ({ editable, value, onChange }) => (
    <div>
      {editable
        ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
        : value
      }
    </div>
  );

class ModifyBooks extends Component{
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
            render: (text, record) => this.renderColumns(text, record, 'name'),
          },{
            title: '作者',
            dataIndex: 'author',
            key: 'author',
            render: (text, record) => this.renderColumns(text, record, 'author'),
          },{
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b)=>a.price-b.price,
            render: (text, record) => this.renderColumns(text, record, 'price'),
          },{
            title: '出版年份',
            dataIndex: 'year',
            key: 'year',
            sorter: (a, b)=>a.year-b.year,
            render: (text, record) => this.renderColumns(text, record, 'year'),
          },{
            title: '种类',
            dataIndex: 'category',
            key: 'category',
            sorter: (a,b) => a.catagory-b.catagory,
            render: (text, record) => this.renderColumns(text, record, 'category'),
          },{
            title: '库存',
            dataIndex: 'storage',
            key: 'storage',
            sorter: (a, b)=> a.storage-b.storage,
            render: (text, record) => this.renderColumns(text, record, 'storage'),
          },{
            title: '编辑',
            dataIndex: 'Edit',
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
        console.log('initial cateloge');
        $.ajax({
          url:'http://localhost:8080/BookManager',
          type: 'GET',
          async:false,
          success: function(books){
            console.log(books);
            adminBook = eval(books);
            console.log('books', adminBook);  
            window.location.href='#';
          }
        })
        this.setState({
          getRefresh: true,
          data: adminBook,
        })
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
                url:'http://localhost:8080/ModifyBooks',
                type: 'GET',
                data: 
                {   'ID': target.ID,
                    'author': target.author,
                    'name': target.name,
                    'price': target.price,
                    'storage' : target.storage,
                    'year':target.year,
                    'catagory': target.catagory,
                },
                success: function(data){
                    console.log('modify success',data);
                    alert('修改成功!');
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
      onDelete = (key) => {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        console.log('data:',data);
        if(target){
          $.ajax({
            url:'http://localhost:8080/DeleteBook',
            type: 'GET',
            data: 
            {   
              'ID': target.ID,
            },
            success: function(data){
              console.log('on delete',data);
              alert(data);
            }
          })
            window.location.href='#';
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

export default ModifyBooks;