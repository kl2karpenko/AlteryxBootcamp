import React, { Component, Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

import TableOfWines from './Table';

import './App.css';

import { FOODS_TYPES_SELECT, PRICES_TYPES_SELECT } from './data/mocks';
import data from './data/wines.json';

const styles = theme => {
  console.log(theme);
  return {
    root: {
      minHeight: '100vh',
      // background: theme.palette.primary.light,
      display: 'flex',
      flexWrap: 'wrap',
      padding: theme.spacing.unit * 4
    },
    paper: {
      width: '100%',
      padding: theme.spacing.unit * 4,
      height: '172px',
      paddingBottom: '0'
    },
    paperNext: {
      width: '100%',
      padding: theme.spacing.unit * 4,
      paddingBottom: '0'
    },
    label: {
      marginBottom: theme.spacing.unit * 2,
      display: 'block'
    },
    formControl: {
      minWidth: 120,
      width: '100%'
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
    button: {
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2
    },
    h1: { textAlign: 'center !important', width: '100%', marginBottom: theme.spacing.unit * 5, color: theme.palette.common.white },
    h4: { marginBottom: theme.spacing.unit * 3, width: '100%', color: theme.palette.common.white },
    h4Next: { marginTop: theme.spacing.unit * 5, marginBottom: theme.spacing.unit * 5, width: '100%', color: theme.palette.common.white },
    table: {
      marginTop: theme.spacing.unit
    },
    tableRowName: {
      // color: '#fff',
      fontSize: 15
    },
    tableRowNameBig: {
      // color: '#fff',
      fontSize: 15,
      minWidth: '60%',
      width: '60%',
    },
    tableCell: {
      color: theme.palette.primary.dark,
      fontSize: 15,
      padding: theme.spacing.unit * 4
    },
    tableCellFirst: {
      color: theme.palette.primary.dark,
      fontSize: 15,
      fontWeight: 'bold',
      padding: theme.spacing.unit * 4
    },
    tableCellBig: {
      color: theme.palette.primary.dark,
      fontSize: 15,
      minWidth: '60%',
      width: '60%',
      paddingTop: '20px !important',
      paddingBottom: '20px !important',
    }
  }
};


class App extends Component {
  state = {
    price: [],
    restaurant: [],
    food: [],
    loading: false,
    selectedPrice: 'none',
    selectedFood: 'none',
    start: Math.floor(Math.random() * 10) + 1,
    end: Math.floor(Math.random() * 20) + 10,
    data: []
  };

  timer = null;

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  updateWines = () => {
    this.setState({
      data
    });

    this.setState({
        start: Math.floor(Math.random() * 10) + 1,
        end: Math.floor(Math.random() * 20) + 10
      }
    )
  };

  onClick = () => {
    if (!this.state.selectedPrice || !this.state.selectedFood) return;

    this.setState({
      loading: true
    });

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        loading: false
      });
      this.updateWines();
    }, 3000);
  };

  render() {
    const { classes = {} } = this.props;
    const {
      selectedPrice,
      selectedFood,
      start,
      end,
      loading,
      data
    } = this.state;
    const chosen = selectedPrice  !== 'none' && selectedFood !== 'none';

    return (
      <div className={classes.root}>
        <Typography variant="h1" component={'div'} align="center" className={classes.h1}>
          Welcome to our restaurant!
        </Typography>
        <Typography variant="h6" align="center" className={classes.h4}>
          Welcome to ours best wine's preposition site!
          You can choose a prices range and food types, and we will propose you the best wines that you have ever tasted
        </Typography>
        <Paper elevation={1} className={classes.paper}>
          <Grid container spacing={8}>
            <Grid item xs={6}>
              <InputLabel
                classes={{ root: classes.label }}
                htmlFor="selectedPrice">
                Choose the price range
              </InputLabel>
              <FormControl variant="outlined" className={classes.formControl}>
                <Select
                  classes={{
                    root: classes.select
                  }}
                  value={selectedPrice}
                  onChange={this.handleChange}
                  input={
                    <OutlinedInput
                      labelWidth={0}
                      name="selectedPrice"
                      id="selectedPrice"
                    />
                  }
                >
                  <MenuItem key={'none'} value={'none'}>Select one</MenuItem>
                  {PRICES_TYPES_SELECT.map(({ name, value }) => <MenuItem key={value} value={value}>{name}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <InputLabel
                classes={{ root: classes.label }} htmlFor="selectedFood">Choose the food type</InputLabel>
              <FormControl variant="outlined" className={classes.formControl}>
                <Select
                  classes={{
                    root: classes.select
                  }}
                  value={selectedFood}
                  onChange={this.handleChange}
                  input={
                    <OutlinedInput
                      labelWidth={0}
                      name="selectedFood"
                      id="selectedFood"
                    />
                  }
                >
                  <MenuItem key={'none'} value={'none'}>Select one</MenuItem>
                  {FOODS_TYPES_SELECT.map(({ name, value }) => <MenuItem key={value} value={value}>{name}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
              >
                <Button variant="outlined" color="primary" component="span" onClick={this.onClick} className={classes.button} disabled={loading}>
                  Find my best Wine for these types of data!
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        {chosen && data.length ? <Fragment>
          <Typography variant="h4" component={'div'} align="center" className={classes.h4Next}>
            Hey! We've got a great Wine's set for you! <br/>
            Choose what you want! =)
          </Typography>
          <TableOfWines data={data.slice(start, end)} classes={classes} />
        </Fragment> : (loading ? <LinearProgress color="primary"  style={{ width: '100%' }}/> : '')}
      </div>
    );
  }
}

export default withStyles(styles)(App);
