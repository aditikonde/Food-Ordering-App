import React, { Component } from 'react';
import './Details.css';
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { parseCategories } from '../../common/helpers/helper';
import { currencyFormat } from '../../common/helpers/helper';


class Details extends Component {

    constructor() {
        super();
        this.state = {
            restaurant: {},
            address: {},
            categories: [],
            cartAmount: 0,
            cartItemNum: 0,
        }
    }

    componentWillMount() {
        // This is how we can access data passed using props.history.push
        // Check Home class restaurantClickHandler method to know how to pass
        // console.log(this.props.history.location.state);

        let id = this.props.history.location.restaurantId;

        let data = null;
        let url = "http://localhost:8080/api/restaurant/" + id;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                // console.log(JSON.parse(this.responseText));
                that.setState({ restaurant: JSON.parse(this.responseText) });
                // console.log(that.state.restaurant.restaurant_name);
                that.setState({
                    address: JSON.parse(this.responseText).address,
                    categories: JSON.parse(this.responseText).categories
                });
            }
        });

        xhr.open("GET", url);
        xhr.send(data);

    }

    render() {
        return (
            <div>
                <Header />
                <div className="details-body">
                    <div className="restaurant-info">
                        <div className="details-img">
                            <img src={this.state.restaurant.photo_URL} alt="resto-img" />
                        </div>
                        <div className="details-resto-info">
                            <div className="info">
                                <div className="row details-resto-name">
                                    <span>{this.state.restaurant.restaurant_name}</span>
                                </div>
                                <div className="row text-uppercase address">
                                    <span>{this.state.address.locality}</span>
                                </div>
                                <div className="row cat-row">
                                    <span>{parseCategories(this.props.history.location.category)}</span>
                                </div>
                                <div className="row last-row">
                                    <div className="details-rating">
                                        <span className="details-rating-h5"><i class="fa fa-star" aria-hidden="true"></i> {this.state.restaurant.customer_rating}</span>
                                        <span className="det-rating-by text-uppercase">Average rating by <span className="nxt-line">{this.state.restaurant.number_customers_rated}</span> customers</span>
                                    </div>
                                    <div className="details-price">
                                        <span className="details-rating-h5"><i className="fa fa-inr" aria-hidden="true"></i> {this.state.restaurant.average_price}</span>
                                        <span className="det-rating-by text-uppercase">average cost for two people</span>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="menu-cart-sec">
                        <div className="details-catergories">
                            {console.log(this.state.categories)}
                        </div>
                        <div className="details-cart">
                            <Card className="my-cart" variant="outlined">
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" className="cart-header" ><i class="fa fa-shopping-cart" aria-hidden="true"></i><div className="cart-item-count"><span>{this.state.cartItemNum}</span></div><span className="cart-title">My Cart</span>
                                    </Typography>

                                    <Typography className="cart-total-amt" ><span className="cart-total">Total Amount</span>
                                        <span className="cart-amount"><i className="fa fa-inr" aria-hidden="true"></i>{currencyFormat(this.state.cartAmount)} </span>
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" style={{ width: '100%' }} color="primary" >Checkout</Button>
                                </CardActions>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Details;