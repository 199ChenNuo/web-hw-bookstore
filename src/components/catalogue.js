import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Input, Icon, Button, Spin, Table } from 'antd';

import {booksOrder} from './shoppingcar';

function minCount(th, record){
  console.log('count',th.count);
  th.count--;
  th.storage++;
  if(th.count===0){
      var booksLen = booksOrder.length;
      for(let i=0; i<booksLen; i++){
          if(booksOrder[i].ID === th.ID){
              booksOrder.splice(i,1);
              break;
          }
      }
  }
}

function addCount(th, record){
  th.count++;
  th.storage--;
  if(th.count===1){
      booksOrder.push(th);
  }
}
/*
export const data = [{
    ID: '0001',
    name: '如何成为一名精致的吃货',
    author: '心远',
    price: 1000,
    year: 2018,
    count: 0,
    storage: 1,
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
*/
export var data='';
class Catalogue extends Component{
    state = {
      filterDropdownVisible: false,
      searchText: '',
      filtered: false,
    };
    componentWillMount = () => {
      console.log('initial cataloge');
      $.ajax({
        url:'http://localhost:8080/db/BookManager',
        type: 'GET',
        //dataType: 'jsonp',
        success: function(books){
          data=eval(books);
          console.log('get data success');
          console.log('data type:',typeof(data));
          console.log('data:',data);          
        }
      })
    }
    onInputChange = (e) => {
      this.setState({ searchText: e.target.value });
    }
    onSearch = () => {
      const { searchText } = this.state;
      const reg = new RegExp(searchText, 'gi');
      this.setState({
        filterDropdownVisible: false,
        filtered: !!searchText,
        data: data.map((record) => {
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
      const columns = [{
        title: '书名',
        dataIndex: 'name',
        key: 'name',
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => this.searchInput = ele}
              placeholder="输入关键字查询"
              value={this.state.searchText}
              onChange={this.onInputChange}
              onPressEnter={this.onSearch}
            />
            <Button type="primary" onClick={this.onSearch}>Search</Button>
          </div>
        ),
        filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
        filterDropdownVisible: this.state.filterDropdownVisible,
        onFilterDropdownVisibleChange: (visible) => {
          this.setState({
            filterDropdownVisible: visible,
          }, () => this.searchInput && this.searchInput.focus());
        },
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
      },/*{
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
      },*/];      
      return (
      <div>
        <Table columns={columns} dataSource={data} />
      </div>);
    }
  }
  
  export default Catalogue;