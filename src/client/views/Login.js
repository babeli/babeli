import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
  Grid,
  Paper,
  withStyles,
  FormControl,
  InputLabel,
  Input,
  Button,
  Typography,
} from '@material-ui/core';

const logo = require('../assets/logo_login.svg');

const styles = theme => ({
  root: {
    flexGrow: 1,
    background: theme.palette.primary.main,
    height: '100vh',
  },
  logo: {
    width: 200,
    padding: '50px 0px',
  },
  paper: {
    padding: '0 20px 20px 20px',
    margin: '0 20px 20px 20px',
    height: '100%',
    color: theme.palette.text.secondary,
  },
  button: {
    marginTop: 20,
  },
  slogan: {
    color: 'white',
  },
});


class Login extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid
          container
          alignItems="center"
          direction="row"
          justify="center">
          <Grid container alignItems="center" justify="center">
            <img className={classes.logo} src={logo}/>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <FormControl margin="normal" fullWidth required>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" autoFocus type="email"/>
              </FormControl>
              <FormControl margin="normal" fullWidth required>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" type="password"/>
              </FormControl>
              <Button size="large" variant="raised" color="primary" className={classes.button} fullWidth>Login</Button>
            </Paper>
            <Typography align="center" className={classes.slogan}>i18n for lazy developers</Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
