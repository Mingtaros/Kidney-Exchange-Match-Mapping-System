import React from 'react';
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import './App.css';
import history from './Utils/history'

const useStyles = (theme) => ({
  root: {
    margin: theme.spacing(1)
  }
});

class App extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className="App">
        <div className={classes.root}>
          <Button 
              variant="contained"
              color="primary"
              onClick={() => history.push('/home')}
              className={classes.root}>
            Go to Home Page
          </Button>
          <Button
              variant="contained"
              color="primary"
              onClick={() => history.push('/admin')}
              className={classes.root}>
            Go to Administrator Page
          </Button>
        </div>
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(App);
