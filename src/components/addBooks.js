import React, {Component} from 'react';
import { Table, Input, Popconfirm, Button, Icon } from 'antd';
import $ from 'jquery';
import { adminLogin } from './adminLogin';

const data = new Array();
data.push({
    name:'书名',
    author:'作者',
    price:'价格',
    year:'出版年份',
    storage:'库存'
})
const EditableCell = ({ editable, value, onChange }) => (
    <div>
      {editable
        ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
        : value
      }
    </div>
);

class AddBooks extends Component{
    constructor(props) {
        super(props);
        this.columns = [{
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
                title: '库存',
                dataIndex: 'storage',
                key: 'storage',
                sorter: (a, b)=> a.storage-b.storage,
                render: (text, record) => this.renderColumns(text, record, 'storage'),
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
            this.state = { data };
            this.cacheData = data.map(item => ({ ...item }));
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
            if (target) {
                delete target.editable;
                this.setState({ data: newData });
                this.cacheData = newData.map(item => ({ ...item }));
                $.ajax({
                    url:'http://localhost:8080/AddBook',
                    type: 'GET',
                    data: 
                    {  
                        'id' :target.id,
                        'author': target.author,
                        'name': target.name,
                        'price': target.price,
                        'storage' : target.storage,
                        'year':target.year,
                    },
                    success: function(data){
                        console.log('add success',data);
                        alert('添加成功！');
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
    render(){
        const content = (
            adminLogin
             ?
            <div>
            <Table bordered dataSource={this.state.data} columns={this.columns} />;
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

export default AddBooks;