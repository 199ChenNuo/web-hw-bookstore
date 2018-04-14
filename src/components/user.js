import React, {Component} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import userHeader from './images/header1.jpg';
import book1 from './images/book1.jpg';
const FormItem = Form.Item;

const favBook = {
    name: 'Game Of Thrones',
       
}
class User extends Component{
    render(){
        return (
            <div>
                <div>
                <h1 style={{textAlign:'center', fontFamily:'kati'}}> 我 </h1>
                <h2 style={{textAlign:'center'}}>喜欢的书籍</h2>
                <h1>岛上书店</h1>    
                    <img src={book1}
                    style={{margin:'0 auto'}}/>     
                </div>       
            </div>
        )
    } 
}

export default User;