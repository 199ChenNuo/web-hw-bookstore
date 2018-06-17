import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Input, Icon, Button, Spin, Table } from 'antd';

import { adminLogin } from './adminLogin';

var data = new Array();

function refresh() {
    console.log('initial cataloge');
    $.ajax({
        url:'http://localhost:8080/Sales',
        
        type: 'GET',
        async:false,
        success: function(orders){
        console.log(orders);
        data=eval(orders);
        window.location.href='#';
        }
    })
    data=data;
    this.setState({
        getRefresh: true,
    })
}

class Sales extends Component{
    state = {
        filterDropdownVisible: false,
        searchText: '',
        filtered: false,
        getRefresh: false,
    };
    componentWillMount = () => {
        console.log('initial cataloge');
        $.ajax({
          url:'http://localhost:8080/Sales',
          type: 'GET',
          async:false,
          success: function(orders){
            data=eval(orders);
            console.log('orderlist:',data); 
            window.location.href='#';
          }
        })
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
            title: 'order ID',
            dataIndex: 'OrderID',
            key: 'OrderID',
            sorter: (a,b) => a.OrderID-b.OrderID,
        },{
            title: '用户ID',
            dataIndex: 'UserID',
            key: 'UserID',
            sorter: (a,b) => a.UserID - b.UserID,
        },
        /*{
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
        },
        */
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b)=>a.price-b.price,
        },
        /*{
            title: '出版年份',
            dataIndex: 'year',
            key: 'year',
            sorter: (a, b)=>a.year-b.year,
        },
        */
        {
            title: '数量',
            dataIndex: 'count',
            key: 'count',
        },];
        const content = (
            adminLogin ? (
                <div>
                <Table columns={columns} dataSource={data} />
                <Button type="primary" onClick={refresh.bind(this)}>点击刷新</Button>
                </div>
            ):(
                <p>
                请登录
                </p>
            )
        )
        return (
            <div>
                { content }
            </div>
        );
    }
}

export default Sales;