import React, {Component} from 'react';
import { Carousel } from 'antd';
import book1 from './images/book1.jpg'
import timg from './images/timg.jpg'

function onChange(a, b, c) {
  console.log(a, b, c);
}

class Home extends Component{
    render(){
        return (
            <div>
                <h1 class="home-title">推荐书目</h1>
                <div></div>
                <div style={{alignItems:'center', background: '#ddd' }}>
                <Carousel afterChange={onChange}>
                    <div>
                        <h1>岛上书店</h1>
                        
                        <img src={book1}
                        style={{margin:'0 auto'}}/>
                        <h3 style={{alignItems:'center', background: '#ddd' }}>1</h3>
                    </div>
                    <div>
                        <h1>岛上书店</h1>
                        
                        <img src={book1}
                        style={{margin:'0 auto'}}/>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h1>唐顿庄园</h1>
                        
                        <img src={timg}
                        style={{margin:'0 auto'}}/>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h1>唐顿庄园</h1>
                        
                        <img src={timg}
                        style={{margin:'0 auto'}}/>
                        <h3>4</h3>
                    </div>
                </Carousel>
                </div>
             </div>
        )
    }
}

export default Home;