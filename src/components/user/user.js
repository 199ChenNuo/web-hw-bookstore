import React, {Component} from 'react';

const favBook = {
    name: 'Game Of Thrones',
       
}
class User extends Component{
    render(){
        return (
            <h3 style={{textAlign='right'}}> 我 </h3>
            <div>
                <h2 style={{textAlign='center'}}>喜欢的书籍</h2>
        )
    }
}

export default User;