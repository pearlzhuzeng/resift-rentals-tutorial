import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: '1em',
    backgroundColor: 'rebeccapurple',
    color: 'white',
    fontWeight: 'bold',
  },
}));

function AppBar() {
  const classes = useStyles();

  return <header className={classes.root}>ReSift Rentals</header>;
}

export default AppBar;
