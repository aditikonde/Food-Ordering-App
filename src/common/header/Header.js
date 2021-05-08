import React, { Component } from 'react';
import Modal from 'react-modal';
import 'typeface-roboto';
import "./Header.css";
import FastfoodIcon from '@material-ui/icons/Fastfood';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { FormControl, FormHelperText, IconButton, Input, InputLabel, Menu, MenuItem, Snackbar, Tab, Tabs, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Home from '../../screens/home/Home';
import ReactDOM from 'react-dom';
import Profile from '../../screens/profile/Profile';
import { Link } from 'react-router-dom';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
}

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}


class Header extends Component {

    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            value: 0,
            contactnum: "",
            contactnumRequired: "displayNone",
            password: "",
            passwordRequired: "displayNone",
            firstNameRequired: "displayNone",
            firstName: "",
            lastNameRequired: "displayNone",
            lastName: "",
            emailRequired: "displayNone",
            email: "",
            invalidEmail: "displayNone",
            registerContactRequired: "displayNone",
            registerContact: "",
            registerPasswordRequired: "displayNone",
            registerPassword: "",
            registrationSuccess: false,
            invalidRegisterPassword: "displayNone",
            validRegisterContact: "displayNone",
            alreadyRegistered: "displayNone",
            invalidcontact: "displayNone",
            noContact: "displayNone",
            invalidcred: "displayNone",
            loggedIn: false,
            anchorEl: null
        }
    }

    openModalHandler = () => {
        this.setState({ modalIsOpen: true });
    }

    closeModalHandler = () => {
        this.setState({
            modalIsOpen: false,
            contactnum: "",
            contactnumRequired: "displayNone",
            value: 0,
            password: "",
            passwordRequired: "displayNone",
            firstNameRequired: "displayNone",
            invalidRegisterPassword: "displayNone",
            emailRequired: "displayNone",
            invalidEmail: "displayNone",
            registerPasswordRequired: "displayNone",
            registerContactRequired: "displayNone",
            validRegisterContact: "displayNone",
            alreadyRegistered: "displayNone",
            openAlert: false,
            invalidcontact: "displayNone",
            invalidcred: "displayNone",
            noContact: "displayNone",
            vertical: 'bottom',
            horizontal: 'left',
        });
    }

    tabChangeHandler = (event, value) => {
        this.setState({ value })
    }

    handleCloseAlert = (event) => {
        this.setState({ openAlert: false });
    };

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    loginClickHandler = () => {
        this.state.contactnum === "" ? this.setState({ contactnumRequired: "displayBlock" }) : this.setState({ contactnumRequired: "displayNone" });
        this.state.password === "" ? this.setState({ passwordRequired: "displayBlock" }) : this.setState({ passwordRequired: "displayNone" });

        if (this.state.contactnum.length !== 10) {
            this.setState({ invalidcontact: "displayBlock", invalidcred: "displayNone", noContact: "displayNone" });
            return;
        }
        let dataLogin = null;
        let xhrLogin = new XMLHttpRequest();
        let that = this;
        xhrLogin.addEventListener("readystatechange", function () {
            let resp = JSON.parse(this.responseText)
            if (this.readyState === 4 && xhrLogin.status === 200) {
                sessionStorage.setItem("uuid", resp.id);
                sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));
                that.setState({
                    loggedIn: true,
                    openAlert: true,
                    firstName: resp.first_name
                });

                that.closeModalHandler();
            }
            console.log(JSON.parse(this.responseText));
            if (JSON.parse(this.responseText).message === "This contact number has not been registered!")
                that.setState({ noContact: "displayBlock", invalidcontact: "displayNone", invalidcred: "displayNone" })
            else if (JSON.parse(this.responseText).message === "Invalid Credentials")
                that.setState({ invalidcred: "displayBlock", invalidcontact: "displayNone", noContact: "displayNone" })
        });

        xhrLogin.open("POST", "http://localhost:8080/api/customer/login");
        xhrLogin.setRequestHeader("Authorization", "Basic " + window.btoa(this.state.contactnum + ":" + this.state.password));
        xhrLogin.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xhrLogin.send(dataLogin);

    }


    registerClickHandler = (event) => {
        this.state.firstName === "" ? this.setState({ firstNameRequired: "displayBlock" }) : this.setState({ firstNameRequired: "displayNone" });
        this.state.email === "" ? this.setState({ emailRequired: "displayBlock" }) : this.setState({ emailRequired: "displayNone" });
        this.state.registerContact === "" ? this.setState({ registerContactRequired: "displayBlock" }) : this.setState({ registerContactRequired: "displayNone" });
        this.state.registerPassword === "" ? this.setState({ registerPasswordRequired: "displayBlock" }) : this.setState({ registerPasswordRequired: "displayNone" });

        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        this.state.email && !pattern.test(this.state.email) ? this.setState({ invalidEmail: "displayBlock" }) : this.setState({ invalidEmail: "displayNone" });

        if (this.state.registerPassword) {
            if (this.isValidPassword(this.state.registerPassword))
                this.setState({ invalidRegisterPassword: "displayNone" })
            else
                this.setState({ invalidRegisterPassword: "displayBlock" })
        }

        this.state.registerContact && this.state.registerContact.length < 10 ? this.setState({ validRegisterContact: "displayBlock" }) :
            this.setState({ validRegisterContact: "displayNone" })

        let data = JSON.stringify({
            contact_number: this.state.registerContact,
            email_address: this.state.email,
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            password: this.state.registerPassword
        });
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4 && xhr.status === 201) {

                that.setState({
                    registrationSuccess: true,
                    openAlert: true,
                    value: 0
                });
            }
            console.log(this.responseText);
            if (JSON.parse(this.responseText).message === "This contact number is already registered! Try other contact number.")
                that.setState({ alreadyRegistered: "displayBlock" })
        });
        xhr.open("POST", "http://localhost:8080/api/customer/signup");
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);
    }

    isValidPassword = (pwd) => {

        let containsNumber = false;
        let containsSpecialChar = false;
        let containsSmallAlphabet = false;
        let containsBigAlphabet = false;
        for (let i = 0; i < pwd.length; i++) {
            if (pwd.charAt(i) >= 'a' && pwd.charAt(i) <= 'z') {
                containsSmallAlphabet = true;
                break;
            }
        }
        for (let i = 0; i < pwd.length; i++) {
            if (pwd.charAt(i) >= 'A' && pwd.charAt(i) <= 'Z') {
                containsBigAlphabet = true;
                break;
            }
        }
        for (let i = 0; i < pwd.length; i++) {
            if ((pwd.charAt(i) >= '0' && pwd.charAt(i) <= '9')) {
                containsNumber = true;
                break;
            }
        }
        for (let i = 0; i < pwd.length; i++) {
            if (!(pwd.charAt(i) >= '0' && pwd.charAt(i) <= '9') && !((pwd.charAt(i) >= 'a' && pwd.charAt(i) <= 'z') ||
                (pwd.charAt(i) >= 'A' && pwd.charAt(i) <= 'Z'))) {
                containsSpecialChar = true;
                break;
            }
        }
        return containsNumber && containsSpecialChar && containsBigAlphabet && containsSmallAlphabet;

    }

    contactnumChangeHandler = (e) => {
        this.setState({ contactnum: e.target.value });
    }

    inputPasswordChangeHandler = (e) => {
        this.setState({ password: e.target.value });
    }

    inputFirstnameChangeHandler = (e) => {
        this.setState({ firstName: e.target.value });
    }

    inputLastnameChangeHandler = (e) => {
        this.setState({ lastName: e.target.value });
    }

    inputEmailChangeHandler = (e) => {
        this.setState({ email: e.target.value });
    }

    inputRegisterContactChangeHandler = (e) => {
        this.setState({ registerContact: e.target.value });
    }

    registerPasswordChangeHandler = (e) => {
        this.setState({ registerPassword: e.target.value });
    }

    onClickLogout = () => {
        sessionStorage.removeItem("access-token");
        this.setState({ loggedIn: false });
        ReactDOM.render(<Home />, document.getElementById("root"));
    }

    onClickProfile = () => {
        ReactDOM.render(<Profile />, document.getElementById("root"));
    }

    render() {
        return (
            <div className="header-container">
                <Link to='/'>
                    <div><FastfoodIcon className="fast-food-logo" /></div>
                </Link>
                {this.props.isHomePage && <div className="search-action">
                    <SearchIcon className="header-search-icon" />
                    <Input className="search-restaurant-text"
                        placeholder="Search by Restaurant Name"
                        onChange={this.props.onSearchTextChange}
                    ></Input>
                </div>}
                <div>
                    {!this.state.loggedIn && this.props.isHomePage &&
                        <div className="header-login">
                            <Button variant="contained" color="default" startIcon={<AccountCircleIcon />} onClick={this.openModalHandler}>
                                LOGIN
                    </Button>
                        </div>}

                    {this.state.loggedIn &&
                        <div>
                            <div style={{ color: "white", margin: "0px 20px", display: "flex", cursor: "pointer" }} aria-controls="simple-menu"
                                aria-haspopup="true" onClick={this.handleClick}>
                                <AccountCircleIcon style={{ margin: "0px 5px" }} /><span > {this.state.firstName}</span>

                            </div>
                            <Menu
                                id="simple-menu"
                                anchorEl={this.state.anchorEl}
                                keepMounted
                                open={Boolean(this.state.anchorEl)}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.onClickProfile}>Profile</MenuItem>
                                <MenuItem onClick={this.onClickLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    }
                    <Modal
                        ariaHideApp={false}
                        isOpen={this.state.modalIsOpen}
                        contentLabel="Login"
                        onRequestClose={this.closeModalHandler}
                        style={customStyles}>
                        <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                            <Tab label="Login" />
                            <Tab label="Signup" />
                        </Tabs>
                        {this.state.value === 0 &&
                            <TabContainer >
                                <FormControl required style={{ maxWidth: "250px", minWidth: "250px" }}>
                                    <InputLabel htmlFor="contactnum" >Contact No.</InputLabel>
                                    <Input id="contactnum" type="text" onChange={this.contactnumChangeHandler} />
                                    <FormHelperText className={this.state.contactnumRequired}><span className="red" >required</span>
                                    </FormHelperText>
                                    <FormHelperText className={this.state.invalidcontact}><span className="red" >Invalid Contact</span>
                                    </FormHelperText>
                                    <FormHelperText className={this.state.noContact}><span className="red" >This contact number has not been registered!</span>
                                    </FormHelperText>
                                </FormControl>
                                <br />
                                <br />
                                <FormControl required style={{ maxWidth: "250px", minWidth: "250px" }}>
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input id="password" type="password" onChange={this.inputPasswordChangeHandler} />
                                    <FormHelperText className={this.state.passwordRequired}><span className="red" >required</span>
                                    </FormHelperText>
                                    <FormHelperText className={this.state.invalidcred}><span className="red" >Invalid Credentials</span>
                                    </FormHelperText>
                                </FormControl>
                                <br />
                                <br />
                                <Button variant="contained" color="primary" onClick={this.loginClickHandler}>
                                    Login
                        </Button>
                            </TabContainer>}


                        {this.state.value === 1 &&
                            <TabContainer >
                                <FormControl required style={{ maxWidth: "250px", minWidth: "250px" }}>
                                    <InputLabel htmlFor="firstName" >First Name</InputLabel>
                                    <Input id="firstName" type="text" onChange={this.inputFirstnameChangeHandler} />
                                    <FormHelperText className={this.state.firstNameRequired}><span className="red" >required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br />
                                <br />
                                <FormControl style={{ maxWidth: "250px", minWidth: "250px" }}>
                                    <InputLabel htmlFor="lastName">Last Name</InputLabel>
                                    <Input id="lastName" type="lastName" onChange={this.inputLastnameChangeHandler} />
                                </FormControl>
                                <br />
                                <br />
                                <FormControl required style={{ maxWidth: "250px", minWidth: "250px" }}>
                                    <InputLabel htmlFor="email" >Email</InputLabel>
                                    <Input id="email" type="email" onChange={this.inputEmailChangeHandler} />
                                    <FormHelperText className={this.state.emailRequired}><span className="red" >required</span>
                                    </FormHelperText>
                                    <FormHelperText className={this.state.invalidEmail}><span className="red" >Invalid Email</span>
                                    </FormHelperText>
                                </FormControl>
                                <br />
                                <br />
                                <FormControl required style={{ maxWidth: "250px", minWidth: "250px" }}>
                                    <InputLabel htmlFor="passsword">Password</InputLabel>
                                    <Input id="password" type="password" onChange={this.registerPasswordChangeHandler} />
                                    <FormHelperText className={this.state.registerPasswordRequired}><span className="red" >required</span>
                                    </FormHelperText>
                                    <FormHelperText className={this.state.invalidRegisterPassword}><span className="red" >
                                        Password must contain at least one capital letter, one small letter, one number, and one special character</span>
                                    </FormHelperText>
                                </FormControl>
                                <br />
                                <br />
                                <FormControl required style={{ maxWidth: "250px", minWidth: "250px" }}>
                                    <InputLabel htmlFor="registerContact">Contact No.</InputLabel>
                                    <Input id="registerContact" type="number" onChange={this.inputRegisterContactChangeHandler} />
                                    <FormHelperText className={this.state.registerContactRequired}><span className="red" >required</span>
                                    </FormHelperText>
                                    <FormHelperText className={this.state.validRegisterContact}><span className="red" >
                                        Contact No. must contain only numbers and must be 10 digits long</span>
                                    </FormHelperText>
                                    <FormHelperText className={this.state.alreadyRegistered}><span className="red" >
                                        This contact number is already registered! Try other contact number.</span>
                                    </FormHelperText>
                                </FormControl>
                                <br />
                                <br />
                                <Button variant="contained" color="primary" onClick={this.registerClickHandler}>
                                    Signup
                        </Button>
                            </TabContainer>}
                    </Modal>
                </div>
                { this.state.loggedIn && <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={this.state.openAlert}
                    autoHideDuration={5000}
                    onClose={this.handleCloseAlert}
                    message="Logged in successfully!"
                    action={[<IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        onClick={this.handleCloseAlert}>x
                    </IconButton>]}
                />}
                { !this.state.loggedIn && <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={this.state.openAlert}
                    autoHideDuration={5000}
                    onClose={this.handleCloseAlert}
                    message="Registered successfully! Please login now!"
                    action={[<IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        onClick={this.handleCloseAlert}>x
                    </IconButton>]}
                />}
            </div>
        )
    }
}

export default Header;