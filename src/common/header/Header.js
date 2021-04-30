import React, { Component } from 'react';
import "./Header.css";
import FastfoodIcon from '@material-ui/icons/Fastfood';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));


const Header = () => {
    const classes = useStyles();
    return (
        <div className="header-container">
            <FastfoodIcon className="fast-food-logo" />
            <div className="search-action">
                <SearchIcon className="header-search-icon" />
                <TextField className="search-restaurant-text" id="standard-basic" placeholder="Search by Restaurant Name" />
            </div>
            <div className="header-login">
                <Button variant="contained" color="default" className={classes.button} startIcon={<AccountCircleIcon />}>
                    LOGIN
                    </Button>
            </div>

        </div>
    )
}

export default Header;