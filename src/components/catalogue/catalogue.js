import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Input, Icon, List, Avatar, Button, Spin, Form, Table, Divider } from 'antd';
import {booksOrder} from '../shoppingcar/shoppingcar';

function minCount(th, record){
  console.log('count',th.count);
  th.count--;
  if(th.count==0){
      var booksLen = booksOrder.length;
      for(let i=0; i<booksLen; i++){
          if(booksOrder[i].ID == th.ID){
              booksOrder.splice(i,1);
              break;
          }
      }
  }
}

function addCount(th, record){
  th.count++;
  if(th.count==1){
      booksOrder.push(th);
  }
}

const dataSource = [{
    ID: '0001',
    name: 'book1',
    author: 'author1',
    price: 100,
    year: 2007,
    count: 0,
    storage: 100,
},{
    ID: '0002',
    name: 'book2',
    author: 'author2',
    price: 99,
    year: 2002,
    count: 0,
    storage: 50,
},{
    ID:'0003',
    name : 'book3',
    author: 'author3',
    price: 66,
    year: 2017,
    count: 0,
    storage: 88,
},];

const columns = [{
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
  sorter: (a, b)=>a<b,
},{
  title: '出版年份',
  dataIndex: 'year',
  key: 'year',
  sorter: (a, b)=>a<b,
},{
title: '库存',
dataIndex: 'storage',
key: 'storage',
},{
  title: '数量',
  dataIndex: 'count',
  key: 'count',
  render: (text, record) => ( //塞入内容
      record.count ? (
        <span>
          <a href="#" onClick={minCount.bind(this,record)}>-</a>
          <a style={{margin:10}}>{record.count}</a>
          <a href="#" onClick={addCount.bind(this,record)}>+</a>
      </span>
      ) : (
        <span>
          <a href="#" onClick={addCount.bind(this, record)}>加入购物车</a>
        </span>
      )
  ),
},];

class Catalogue extends Component{
    state = {
        filterDropdownVisible: false,
        data: booksOrder,
        searchText: '',
        filtered: false, 
    };

    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
      }
      onSearch = () => {
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
          filterDropdownVisible: false,
          filtered: !!searchText,
          data: booksOrder.map((record) => {
            const match = record.name.match(reg);
            if (!match) {
              return null;
            }
            return {
              ...record,
              name: (
                <span>
                  {record.name.split(reg).map((text, i) => (
                    i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                  ))}
                </span>
              ),
            };
          }).filter(record => !!record),
        });
      }
      render() {
        return (
          <div style={{margin:'auto',width:1200,}}>
            <h5 style={{fontSize:30}}>我的购物车</h5>
            <Table
            columns={columns}
            dataSource={dataSource} 
            style={{textAlign:'center'}}
            pagination={true}
            />
          </div>
        );
      }
}

export default Catalogue;