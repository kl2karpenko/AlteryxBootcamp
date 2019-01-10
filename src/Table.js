import React, { Component } from 'react';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

class TableOfWines extends Component {
  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    page: 0,
    rowsPerPage: 5,
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: this.props.data.map((n, i) => i) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, index) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(index);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, index);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  onGetWine = () => {
    alert('Will e in 2 minutes! Have a good day!)')
  };

  render () {
    const { data, classes, names = [ 'Name', 'Points', 'Price $', 'Province', 'Description' ] } = this.props;
    const { selected } = this.state;

    let renderData = data;
    let rowCount = data.length;
    let numSelected = selected.length;

    return (
      <Paper elevation={1} className={classes.paperNext}>
        <Grid container>
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <Button variant="outlined" color="primary" onClick={this.onGetWine} className={classes.button} disabled={!numSelected}>
                Get this wine right now!)
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Table className={classes.table} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"
                         align={'center'} >
                <Checkbox
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={numSelected === rowCount}
                  onChange={this.handleSelectAllClick}
                />
              </TableCell>
              {names.map((row, i) => {
                return (
                  <TableCell
                    key={row}
                    className={i === names.length - 1 ? classes.tableRowNameBig : classes.tableRowName}
                    align={'center'}
                    padding={'none'}
                  >
                    {row}
                  </TableCell>
                );
              }, this)}
            </TableRow>
          </TableHead>
          <TableBody>
            {renderData.map(({ description, designation, points, price, province }, index) => {
              const isSelected = this.isSelected(index);
              return (
                <TableRow
                  hover
                  onClick={event => this.handleClick(event, index)}
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex={-1}
                  key={designation}
                  selected={isSelected}
                >
                  <TableCell
                    classes={{ root: classes.tableCell }} padding="checkbox">
                    <Checkbox checked={isSelected} />
                  </TableCell>
                  <TableCell
                    classes={{ root: classes.tableCellFirst }} align="center">{designation}</TableCell>
                  <TableCell
                    classes={{ root: classes.tableCell }} align="center">{points}</TableCell>
                  <TableCell
                    classes={{ root: classes.tableCell }} align="center">{price}</TableCell>
                  <TableCell
                    classes={{ root: classes.tableCell }} align="center">{province}</TableCell>
                  <TableCell
                    classes={{ root: classes.tableCellBig }} align="center">{description}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default TableOfWines;