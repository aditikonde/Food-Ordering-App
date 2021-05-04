import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../home/Home';
import Details from '../details/Details';

class Controller extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/restaurant/:id" component={Details} />
                    {/* <Route path='/restaurant/:id' render={(props) => <Details {...props} />} /> */}
                </Switch>
            </Router>
        );
    }
}

export default Controller;