import React, {Component} from 'react';
import UserName from './settings';
import userHeader from './images/header1.jpg';
import book1 from './images/book1.jpg';
import { clientLogin } from './login';

/*
const favBook = {
    name: 'Game Of Thrones',
       
}
*/
class User extends Component{
    render(){
        const content = (
            clientLogin ?
            <div>
                <h2 style={{textAlign:'center'}}>喜欢的书籍</h2>
                <h1>岛上书店</h1>    
                <img src={book1}
                style={{margin:'0 auto'}}/>     
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

export default User;