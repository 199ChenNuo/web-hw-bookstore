import React, {Component} from 'react';
import { Switch, Route, Link } from 'react-router-dom'

class Home extends Component{
    render(){
        return(
            <p>this is home page</p>
        )
    }
}

class Roster extends Component{
    render(){
        return(
            <p>this is roster page</p>
        )
    }
}

class Schedule extends Component{
    render(){
        return(
            <p>this is schedule page</p>
        )
    }
}

class Header extends Component{
    render(){
        return(
            <header>
                <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/roster'>Roster</Link></li>
                    <li><Link to='/schedule'>Schedule</Link></li>
                </ul>
                </nav>
            </header>
        )
    }  
}

class Content extends Component{
    render(){
        return(
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/index' component={Roster}/>
                <Route path='/schedule' component={Schedule}/>
            </Switch>
        )
    }
}

class MainRouter extends Component{
    render(){
        return(
            <div>
                <Header />
                <Content />
            </div>
        )
    }
}

export default MainRouter;