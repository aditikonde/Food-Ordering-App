import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../home/Home';
import Details from '../details/Details';
import Checkout from '../checkout/Checkout';
import Profile from '../profile/Profile';

class Controller extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/restaurant/:id" component={Details} />
                    <Route exact path="/checkout" component={Checkout} />
                    <Route exact path="/profile" component={Profile} />
                    {/* <Route path='/restaurant/:id' render={(props) => <Details {...props} />} /> */}
                </Switch>
            </Router>
        );
    }
}

export default Controller;