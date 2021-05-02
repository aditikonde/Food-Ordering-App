import React, { Component } from 'react';
import './Home.css';
import RestaurantCard from '../restaurantCard/RestaurantCard';
import Header from '../../common/header/Header';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            restaurants: [{}]
        }
    }

    componentWillMount() {
        let data = null;
        let url = "http://localhost:8080/api/restaurant";
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(JSON.parse(this.responseText));
                that.setState({ restaurants: JSON.parse(this.responseText).restaurants });
            }
        });

        xhr.open("GET", url);
        // xhr.setRequestHeader("cache-control")
        xhr.send(data);
    }


    render() {
        return (
            <div className="home-container">
                <Header />
                <div className="home-page">
                    {this.state.restaurants.map(restaurant => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                    {/* <RestaurantCard />
                    <RestaurantCard />
                    <RestaurantCard />
                    <RestaurantCard />
                    <RestaurantCard />
                    <RestaurantCard />
                    <RestaurantCard />
                    <RestaurantCard /> */}


                </div>
            </div>
        );
    }
}

export default Home;
