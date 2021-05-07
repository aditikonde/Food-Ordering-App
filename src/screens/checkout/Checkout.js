import React, { Component } from 'react';
import Header from '../../common/header/Header';
import "./Checkout.css";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { AppBar, Box, FormControl, FormControlLabel, FormLabel, GridList, GridListTile, GridListTileBar, IconButton, Radio, RadioGroup, Tab, Tabs } from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

class Checkout extends Component {

  constructor() {
    super();
    this.state = {
      activeStep: 0,
      steps: ['Delivery', 'Payment'],
      value: "cod",
      tabvalue: 0,
      savedAddresses: [{}]
    }
  };

  a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  handleNext = () => {

    this.setState({ activeStep: this.state.activeStep + 1 });
  };

  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  };

  handleReset = () => {
    this.setState({ activeStep: 0 });
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleTabChange = (event, newValue) => {
    this.setState({ tabvalue: newValue });
  };

  componentDidMount() {
    let data = null;
    let url = "http://localhost:8080/api/address/customer";
    let xhr = new XMLHttpRequest();
    let that = this;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(JSON.parse(this.responseText));
        that.setState({
          savedAddresses: JSON.parse(this.responseText).addresses
        });
      }
    });

    xhr.open("GET", url);
    xhr.setRequestHeader("authorization", "Bearer " + sessionStorage.getItem("access-token"))
    xhr.send(data);
  }

  handleAddressClick = (idx) => {

  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div className="flex-container">

            <div className="left">
              <AppBar position="static">
                <Tabs value={this.state.tabvalue} onChange={this.handleTabChange} aria-label="simple tabs example">
                  <Tab label="EXISTING ADDRESS" {...this.a11yProps(0)} />
                  <Tab label="NEW ADDRESS" {...this.a11yProps(1)} />
                </Tabs>
              </AppBar>
              <TabPanel value={this.state.tabvalue} index={0}>
                {!this.state.savedAddresses && <div>
                  There are no saved addresses! You can save an address using the 'New Address' tab or using your ‘Profile’ menu option.
                 </div>}
                {this.state.savedAddresses && <div>
                  <GridList cols={3} style={{ flexWrap: 'nowrap', transform: 'translateZ(0)', width: '100%' }}>
                    {this.state.savedAddresses.map((address, idx) => (
                      <GridListTile key={address.id} className="address-grid">
                        <div >
                          <div>{address.flat_building_name}</div>
                          <div>{address.locality}</div>
                          <div>{address.city}</div>
                          {/* <div>{address.state.state_name}</div> */}
                          <div>{address.pincode}</div>
                          <IconButton >
                            <CheckCircle onClick={this.handleAddressClick(idx)} />
                          </IconButton>
                        </div>
                      </GridListTile>
                    ))}
                  </GridList>
                </div>}
              </TabPanel>
              <TabPanel value={this.state.tabvalue} index={1}>
                New address
              </TabPanel>
            </div>
            <div className="right">
              Summary
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <FormControl component="fieldset">
              <FormLabel component="legend">Select mode of payment</FormLabel>
              <RadioGroup aria-label="payment" name="payment1" value={this.state.value} onChange={this.handleChange}>
                <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
                <FormControlLabel value="wallet" control={<Radio />} label="Wallet" />
                <FormControlLabel value="netbanking" control={<Radio />} label="Net Banking" />
                <FormControlLabel value="card" control={<Radio />} label="Debit/Credit Card" />
              </RadioGroup>
            </FormControl>
          </div>
        );
      // case 2:
      //   return (
      //     <div>deiv 1</div>
      //   );
      default:
        return 'Unknown step';
    }
  }

  render() {
    return (
      <div >
        <Header isHomePage={false} />
        <div>
          <Stepper activeStep={this.state.activeStep} orientation="vertical">
            {this.state.steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{this.getStepContent(index)}</Typography>
                  <div >
                    <div>
                      <Button
                        disabled={this.state.activeStep === 0}
                        onClick={this.handleBack}

                      >
                        Back
                  </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}

                      >
                        {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {this.state.activeStep === this.state.steps.length && (
            <Paper square elevation={0} >
              <Typography>View the summary & place your order now!</Typography>
              <Button onClick={this.handleReset} >
                Change
          </Button>
            </Paper>
          )}
        </div>
      </div>
    )
  }
}


export default Checkout;

