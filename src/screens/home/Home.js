import React, { Component } from 'react';
import './Home.css';
import RestaurantCard from '../restaurantCard/RestaurantCard';

class Home extends Component {
    render() {
        return (
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
        );
    }
}

export default Home;
