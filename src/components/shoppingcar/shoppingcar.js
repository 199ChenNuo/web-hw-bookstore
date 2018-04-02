import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { List, Avatar, Button, Spin, Form, Table, Divider } from 'antd';

export var booksOrder = new Array();
var total = 0;
var selectTotal = 0;

function calTotal() {
    total=0;
    for(let i=0; i<booksOrder.length; i++){
        total += booksOrder[i].price * booksOrder[i].count;
    }
}

function calSelectTotal(selectedRowKeys) {
    selectTotal=0;
    for(let i=0; i<selectedRowKeys.length; i++){
        selectTotal += selectedRowKeys[i].price * selectedRowKeys[i].count;
    }
}

function minCount(th, record){
    console.log('count',th.count);
    th.count--;
    th.storage++;
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
function submitOrder(e){
    alert("提交成功，共"+total+"元");
    for(let i=0; i<booksOrder.length; i++){
        booksOrder.splice(0,1);
    }
}
function addCount(th, record){
    th.count++;
    th.storage--;
    if(th.count==1){
        booksOrder.push(th);
    }
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
    title: '数量',
    dataIndex: 'count',
    key: 'count',
    sorter: (a,b)=>a.count-b.count,
    render: (text, record) => ( //塞入内容
        <span>
        <Button href="#" type="primary" onClick={minCount.bind(this,record)}>-</Button>
        <a style={{margin:10}}>{record.count}</a>
        <Button href="#" type="primary" onClick={addCount.bind(this,record)}>+</Button>
        </span>
    ),},{
    title: '库存',
    dataIndex: 'storage',
    key: 'storage',
    sorter: (a,b)=>a.storage-b.storage,
    },
];

class ShoppingCar extends Component{
    state = {
        selectedRowKeys: [],
    };
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
        calSelectTotal();
    };
    calSelectTotal= () => {
        const { selectedRowKeys } = this.state;
        selectTotal=0;
        for(let i=0; i<selectedRowKeys.length; i++){
            selectTotal += selectedRowKeys[i].price * selectedRowKeys[i].count;
        }
    };

    render(){
        const { selectedRowKeys } = this.state;
        let dataLen = Array.length;
        const rowSelection = [{
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            selections: [{
                key: 'all-data',
                text: 'Select All Data',
                onSelect: () => {
                  calSelectTotal(selectedRowKeys);
                  this.setState({
                    selectedRowKeys: [...Array(dataLen).keys()], // 0...45
                  });
                  //calSelectTotal();
                },
              },
            ],
              onSelection: this.onSelection,
            },];
        return (
            <div>
                <h1>购物车</h1>
                <Table
                    columns={columns}
                    dataSource={booksOrder}
                    rowSelection={rowSelection}
                    pagination={{
                        showTotal: function() {
                            calTotal();
                            calSelectTotal(selectedRowKeys);
                            return '共' + total + '元';// + '，已选择' + selectTotal + '元';
                            /*return 
                                <div style={{marginLeft:1000}}>
                                    <a style={{fontSize:35}}>共</a>
                                    <a style={{fontSize:35}}> { booksOrder.count }</a>
                                    <a style={{fontSize:35}}>条订单，共</a>
                                    <a style={{fontSize:35}}> { total } </a>
                                    <a style={{fontSize:35}}>元</a>
                                </div>
                                */
                        },
                    }}
                />
                <Button onClick={this.submitOrder} type="primary" htmlType="submit">提交订单</Button>
            </div>
        )
    }
}

export default ShoppingCar;