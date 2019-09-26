import React from 'react';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'rebeccapurple',
    color: 'white',
    fontWeight: 'bold',
    padding: 16,
    width: '100%',
  },
}));

function AppBar({ className }) {
  const classes = useStyles();

  return <header className={classNames(classes.root, className)}>ReSift Rentals</header>;
}

export default AppBar;
