import React, { Component } from 'react';
import './Home.css';
import RestaurantCard from '../restaurantCard/RestaurantCard';
import Header from '../../common/header/Header';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            restaurants: [{}],
            allRestaurants: [{}]
        }
    }

    componentWillMount() {
        let data = null;
        let url = "http://localhost:8080/api/restaurant";
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                // console.log(JSON.parse(this.responseText));
                that.setState({
                    allRestaurants: JSON.parse(this.responseText).restaurants,
                    restaurants: JSON.parse(this.responseText).restaurants
                });
            }
        });

        xhr.open("GET", url);
        // xhr.setRequestHeader("cache-control")
        xhr.send(data);
    }

    restaurantClickHandler = (restaurant) => {
        let pathStr = '/restaurant/' + restaurant.id;
        let restaurantId = restaurant.id;
        this.props.history.push({
            pathname: pathStr,
            restaurantId: restaurantId,
            category: restaurant.categories
        });

        // let resto = { ...restaurant };
        // this.props.history.push({
        //     pathname: pathStr,
        //     state: resto
        // });
    }

    onSearchTextChange = (e) => {
        let search = e.target.value;
        if (search === "") {
            this.setState({ restaurants: this.state.allRestaurants })
        }
        else {
            let data = null;
            let url = "http://localhost:8080/api/restaurant/name/" + search;
            let xhr = new XMLHttpRequest();
            let that = this;
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    that.setState({ restaurants: JSON.parse(this.responseText).restaurants });
                }
            });
            xhr.open("GET", url);
            xhr.send(data);
        }
    }

    render() {
        return (
            <div className="home-container">
                <Header onSearchTextChange={this.onSearchTextChange} />
                <div className="home-page">
                    {this.state.restaurants && this.state.restaurants.map(restaurant => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} onRestaurantClick={this.restaurantClickHandler.bind(this, restaurant)} />
                    ))}
                    {
                        !this.state.restaurants && <div>No restaurant with the given name.</div>
                    }
                </div>
            </div>
        );
    }
}

export default Home;
