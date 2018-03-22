import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { List, Avatar, Button, Spin, Form, Table, Divider } from 'antd';
//import { outData} from './PageBuyerlist'

const dataSource = [{
  key: '1',
  ID: 'B00000',
  name: 'book1',
  writer: 'writer1',
  cost: 100,
  date: '2017.05.09',
  publish: '出版社000',
}, {
  key: '2',
  ID: 'B00001',
  name: 'book2',
  writer: 'writer2',
  cost: 65,
  date: '2017.11.09',
  publish: '出版社001',
}, {
  key: '3',
  ID: 'B00012',
  name: 'book3',
  writer: 'writer3',
  cost: 150,
  date: '2017.06.11',
  publish: '出版社002',
},];

const columns = [{
  title: 'ID',
  dataIndex: 'ID',
  key: 'id',
  sorter: (a,b)=>a<b
}, {
  title: '书名',
  dataIndex: 'name',
  key: 'name',
  sorter: (a,b)=>a<b
}, {
  title: '作者',
  dataIndex: 'writer',
  key: 'writer',
}, {
  title: '价格',
  dataIndex: 'cost',
  key: 'cost',
  sorter: (a,b)=>a.cost-b.cost
}, {
  title: '出版年份',
  dataIndex: 'date',
  key: 'date',
  sorter: (a,b)=>a<b
}, {
  title: '出版社',
  dataIndex: 'publish',
  key: 'publish',
}, {
  title: '购买',
  dataIndex: 'pay',
  key: 'pay',
  render: (text, record)=>(
    <span>
      <a href="#">加入购物车</a>
      <Divider type="vertical" />
    </span>
  ),
}, ];


class Catalogue extends Component{
  render(){
    return (
      <div style={{margin:'auto',width:1200,}}>
        <Table dataSource={dataSource} columns={columns} 
        onRowClick={this.exportItem}
        />
      </div>
    )
  }
  exportItem(record,index){
    console.log(record,index)
    var item = {
      //BID:outData.length+1,
      ID:record.ID,
      cost:record.cost,
      date:record.date,
      key:record.key,
      name:record.name,
      publish:record.publish,
      writer:record.writer
    }
    console.log('item',item);
    //outData.push(item);
    //console.log('outdata',outData)
    console.log('datasource',dataSource)
  }


}


export default Catalogue;