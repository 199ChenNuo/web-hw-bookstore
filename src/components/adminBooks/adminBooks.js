import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { List, Avatar, Button, Spin, Form, Table, Divider } from 'antd';
import { data } from '../catalogue/catalogue'

function minStorage(th, record){
    console.log('storage',th.storage);
    th.storage--;
    if(th.storage==0){
        var booksLen = data.length;
        for(let i=0; i<booksLen; i++){
            if(data[i].ID == th.ID){
                data.splice(i,1);
                break;
            }
        }
    }
}

function addStorage(th, record){
    th.storage++;
}

const columns = [{
    title: '书名',
    dataIndex: 'name',
    key: 'name',
    },{
    title: '作者',
    dataIndex: 'author',
    key: 'author',
    sorter: (a,b)=>a.author<b.author,
    },{
    title: '价格',
    dataIndex: 'price',
    key: 'price',
    sorter: (a,b)=>a.price-b.price,
    },{
    title: '出版年份',
    dataIndex: 'year',
    key: 'year',
    sorter: (a,b)=>a.year-b.year,
    },{
    title: '更改库存',
    dataIndex: 'storage',
    key: 'storage',
    sorter: (a,b)=>a.storage-b.storage,
    render: (text, record) => ( //塞入内容
        <span>
        <Button href="#" type="primary" onClick={minStorage.bind(this,record)}>-</Button>
        <a style={{margin:10}}>{record.storage}</a>
        <Button href="#" type="primary" onClick={addStorage.bind(this,record)}>+</Button>
        </span>
    ),
    },
];

class AdminBooks extends Component{
    render(){
        return (
            <div>
                <Table
                    columns={columns}
                    dataSource={data}
                />
            </div>
        )
    }
}

export default AdminBooks;