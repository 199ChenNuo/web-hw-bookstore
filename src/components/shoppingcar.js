import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import { Input, Icon, Button, Spin, Table } from 'antd';
import { clientLogin } from './login';

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
        let booksLen = booksOrder.length;
        for(let i=0; i<booksLen; i++){
            if(booksOrder[i].ID === th.ID){
                booksOrder.splice(i,1);
                break;
            }
        }
    }
}
function submitOrder(th, record){
    alert("提交成功，共"+total+"元");
   
    let booksOrderLen=booksOrder.length;
    console.log('remove count:',booksOrderLen);
    
    for(let i=0; i<booksOrderLen; i++){
        
        booksOrder.pop();
    }
    //booksOrder=new Array();
   //booksOrder.splice(0,booksOrderLen);
}
function addCount(th, record){
    console.log('add count, book:',th.name);
    th.count++;
    th.storage--;
    /*
    if(th.count===1){
        booksOrder.push(th);
    }
    */
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



class ShoppingCar extends Component{
    state = {
        selectedRowKeys: [],
        filterDropdownVisible: false,
        data: booksOrder,
        searchText: '',
        filtered: false,
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
    render(){
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
        const content = (
             clientLogin ?
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
                <Button href="#" onClick={submitOrder.bind(this)} type="primary" htmlType="submit">提交订单</Button>
            </div>
            :
            <p>
                请先登录
            </p>
        )
        return (
            <div>
                { content }
            </div>
        )
    }
}

export default ShoppingCar;