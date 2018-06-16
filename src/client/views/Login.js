import PropTypes from 'prop-types';
import React, { Component } from 'react';
//  import { Formik } from 'formik';
import { translate } from 'react-i18next';
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

@translate()
class Login extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
  }

  render() {
    const { classes, t } = this.props;

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
                <InputLabel htmlFor="email">{t('login.label.email')}</InputLabel>
                <Input id="email" autoFocus type="email"/>
              </FormControl>
              <FormControl margin="normal" fullWidth required>
                <InputLabel htmlFor="password">{t('login.label.password')}</InputLabel>
                <Input id="password" type="password"/>
              </FormControl>
              <Button size="large" variant="raised" color="primary" className={classes.button} fullWidth>{t('login.button.login')}</Button>
            </Paper>
            <Typography align="center" className={classes.slogan}>{t('app.slogan')}</Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
