import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Input, Icon, Button, Spin, Table } from 'antd';

import { booksOrder } from './shoppingcar';
import { clientLogin } from './login';

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
  if(!clientLogin){
    alert('请先登录');
    return;
  }else{
    th.count++;
    th.storage--;
    var inOrder=false;
    let booksOrderLen=booksOrder.length;
    for(let i=0; i<booksOrderLen; i++){
        if(booksOrder[i].name==th.name){
            inOrder=true;
            break;
        }
    }
    if(!inOrder){
        booksOrder.push(th);
    }
  }
}

function refresh() {
  console.log('initial cataloge');
      $.ajax({
        url:'http://localhost:8080/BookManager',
       
        type: 'GET',
        async:false,
        success: function(books){
          console.log(books);
          
          data=eval(books);
          
          console.log('get data success');
          console.log('origin data:',data);   
          
          var booksLen = data.length;
          console.log('books len:',booksLen);
          for(let i=0; i<booksLen; i++){
            var b = data[i];
            console.log('book',i+1);
            b.count='0';
            console.log(b);
          }
          console.log('made books:',data);
          window.location.href='#';
          
        }
      })
      data=data;
      this.setState({
        getRefresh: true,
      })
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
export var data = new Array();
class Catalogue extends Component{
    state = {
      filterDropdownVisible: false,
      searchText: '',
      filtered: false,
      getRefresh: false,
    };
    componentWillMount = () => {
      console.log('initial cataloge');
      /*
      $.ajax({  
        url:"https://localhost:8080/db/BookManager",    
        dataType : 'jsonp',  
        jsonp:"callback",   
        type:'post',  
          
        error: function(data) {   
            console.log(data);  
        },  
        success:function(data){  
        //  alert("suc");  
            console.log(data);  
      
        },  
    });
    */
      
    $.ajax({
      url:'http://localhost:8080/BookManager',
    
      type: 'GET',
      async:false,
      success: function(books){
        console.log(books);
        
        data=eval(books);
        
        console.log('get data success');
        console.log('origin data:',data);   
        
        var booksLen = data.length;
        console.log('books len:',booksLen);
        for(let i=0; i<booksLen; i++){
          var b = data[i];
          console.log('book',i+1);
          b.count='0';
          console.log(b);
        }
        console.log('made books:',data);
        window.location.href='#';
        
      }
    })
    data=data;
    this.setState({
      getRefresh: true,
    })
     
      
    }
    onInputChange = (e) => {
      this.setState({ searchText: e.target.value });
    }
    onSearch = () => {
      console.log('search');

      
      

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
        title: 'ID',
        dataIndex: 'ID',
        key: 'ID',
        sorter: (a,b) => a.ID-b.ID,
      },{
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
      return (
      <div>
        <Table columns={columns} dataSource={data} />
        <Button type="primary" onClick={refresh.bind(this)}>点击刷新</Button>
      </div>);
    }
  }
  
  export default Catalogue;