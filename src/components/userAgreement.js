import React, {Component} from 'react';

class UserAgreement extends Component{
    render(){
        return(
          <div>
            <p>
                用户的一个示例用户名和密码
                user1
                password1
            </p>
            <p>
            点击<a href="/Home">此处</a>回到首页
            </p>
          </div>
        )
    }
}

export default UserAgreement;