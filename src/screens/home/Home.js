import React, { Component } from 'react';
import './Home.css';
import RestaurantCard from '../restaurantCard/RestaurantCard';
import Header from '../../common/header/Header';

class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <Header />
                <div className="home-page">
                    <RestaurantCard />
                    <RestaurantCard />
                    <RestaurantCard />
                    <RestaurantCard />
                    <RestaurantCard />
                    <RestaurantCard />
                    <RestaurantCard />
                    <RestaurantCard />

                </div>
            </div>
        );
    }
}

export default Home;
