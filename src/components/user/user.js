import React, {Component} from 'react';
import UserName from './settings';
import userHeader from '../images/header1.jpg';
import book1 from '../images/book1.jpg';
import { clientLogin } from './userLogin';
import $ from 'jquery';
/*
const favBook = {
    name: 'Game Of Thrones',
       
}
*/
class User extends Component{
    componentWillMount = () => {
        if(clientLogin){
            $.ajax({
                url:'http://localhost:8080/UserInfo',
                type: 'POST',
                async:false,
                success(data){
                    console.log(data);
                }
            })
        }
    }
    render(){
        const content = (
            clientLogin ?
            <div>
                <img src={userHeader} />
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