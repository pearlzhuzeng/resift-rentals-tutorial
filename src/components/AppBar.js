import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'rebeccapurple',
    color: 'white',
    fontWeight: 'bold',
    padding: 16,
    width: '100%',
  },
}));

function AppBar() {
  const classes = useStyles();

  return <header className={classes.root}>ReSift Rentals</header>;
}

export default AppBar;
