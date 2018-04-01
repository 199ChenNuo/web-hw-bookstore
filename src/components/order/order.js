import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Input, Icon, List, Avatar, Button, Spin, Form, Table, Divider } from 'antd';


export const data = [{
    ID: '0004',
    name: 'book4',
    author: 'author4',
    price: 100,
    year: 2007,
    count: 0,
    storage: 100,
},{
    ID: '0005',
    name: 'book5',
    author: 'author5',
    price: 99,
    year: 2002,
    count: 0,
    storage: 50,
},{
    ID:'0006',
    name : 'book6',
    author: 'author6',
    price: 66,
    year: 2017,
    count: 0,
    storage: 88,
},];

class Order extends Component{
  state = {
    filterDropdownVisible: false,
    data: data,
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
    },{
      title: '数量',
      dataIndex: 'count',
      key: 'count',
    },];      
    return <Table columns={columns} dataSource={this.state.data} />;
  }
}

export default Order;