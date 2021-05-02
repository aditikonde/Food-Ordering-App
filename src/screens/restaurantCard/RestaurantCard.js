import React from 'react';
import './RestaurantCard.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles({
    root: {
        maxWidth: 281
    },
    media: {
        height: 160,
    },
});


export default function RestaurantCard(props) {
    const classes = useStyles();

    return (
        <div className="res-card">
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={props.restaurant.photo_URL}
                        title="restaurant-image"
                    />
                    <div className="content">
                        <CardContent>
                            <div className="restaurant-name">
                                <Typography gutterBottom variant="h5" component="h2" >
                                    {props.restaurant.restaurant_name}
                                </Typography>
                            </div>

                            <Typography variant="body2"  >
                                {props.restaurant.categories}
                            </Typography>
                        </CardContent>
                    </div>
                </CardActionArea>
                <div className="content">
                    <CardActions>
                        <div className="bottom-btns">
                            <button size="small" className="rating-btn">
                                <i class="fa fa-star" aria-hidden="true"></i> {props.restaurant.customer_rating} ({props.restaurant.number_customers_rated})
                            </button>

                            <Typography variant="body2" color="default" className="avg-cost">
                                <i className="fa fa-inr" aria-hidden="true"></i>{props.restaurant.average_price} for two
                            </Typography>
                        </div>
                    </CardActions>
                </div>
            </Card>
        </div>
    );
}