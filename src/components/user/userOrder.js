import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Input, Icon, Button, Spin, Table } from 'antd';

//import { order } from './shoppingcar';
import { clientLogin,userdata } from './userLogin';
import '../style.css'
export var data = new Array();

//var order = new Array();

class Order extends Component{
    state = {
      filterDropdownVisible: false,
      searchText: '',
      filtered: false,
      getRefresh: false,
      beginDate: '',
      endDate: '',
    };
    componentWillMount = () => {
      console.log('initial cataloge');
      $.ajax({
        url:'http://localhost:8080/PrevOrder',
        type: 'GET',
        async:false,
        data:{
          userId: userdata[0].ID,
        },
        success: function(orders){
          console.log(orders);
          data=eval(orders);
          console.log('get data success');
          console.log('origin data:',data);   
          var ordersLen = data.length;
          console.log('orders len:',ordersLen);
          for(let i=0; i<ordersLen; i++){
            var b = data[i];
            console.log('order',i+1);
            console.log(b);
          }
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
    inputBeginDate = (e) => {
      this.setState({ beginDate: e.target.value });
    }
    inputEndDate = (e) => {
      this.setState({ endDate: e.target.value });
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
    onSearchDate = () => {
      $.ajax({
        url:'http://localhost:8080/PrevOrderByDate',
        type: 'GET',
        async:false,
        data:{
          userId: userdata[0].ID,
          beginDate: this.state.beginDate,
          endDate: this.state.endDate,
        },
        success(orders){
          data=eval(orders);
          window.location.href='#';
        }
      })
    }
    refresh = () => {
      $.ajax({
        url:'http://localhost:8080/PrevOrder',
        type: 'GET',
        async:false,
        data:{
          userId: userdata[0].ID,
        },
        success: function(orders){
          console.log(orders);
          data=eval(orders);
          console.log('get data success');
          console.log('origin data:',data);   
          var ordersLen = data.length;
          console.log('orders len:',ordersLen);
          for(let i=0; i<ordersLen; i++){
            var b = data[i];
            console.log('order',i+1);
            console.log(b);
          }
          window.location.href='#';
        }
      })
      data=data;
      this.setState({
        getRefresh: true,
      })
    }
    render() {
      const columns = [{
        title: 'ID',
        dataIndex: 'ID',
        key: 'ID',
        sorter: (a,b) => a.ID-b.ID,
      },{
        title: '购买时间',
        dataIndex: 'date',
        key: 'date',
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
        title: '数量',
        dataIndex: 'count',
        key: 'count',
    },];  
    const content = (
      clientLogin ?
      <div>
        <div class="date">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="2000-01-01"
            value={this.state.beginDate}
            onChange={this.inputBeginDate}
          />
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="2018-06-23"
            value={this.state.endDate}
            onChange={this.inputEndDate}
          />
          <a>
          <Button type="primary" onClick={this.onSearchDate}>搜索</Button>
          <a>    </a>
          <Button type="primary" onClick={this.refresh}>重置</Button>
          </a>
        </div>
        <div>
        <Table columns={columns} dataSource={data} />
        </div>
        
      </div>
      :
      <div>请先登录</div>
    )    
      return (
      <div>
        { content }
      </div>);
    }
  }
  
  export default Order;