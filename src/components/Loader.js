import React from 'react';
// ReSift
import { useFetch, isLoading, isNormal } from 'resift';
// Styles
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles(theme => ({
  root: {},
  spinner: {
    color: 'white',
  },
}));

function Loader({ children, className, fetch }) {
  const classes = useStyles();
  const [data, status] = useFetch(fetch);

  return (
    <div className={classNames(classes.root, className)}>
      {isLoading(status) && <CircularProgress className={classes.spinner} />}
      {isNormal(status) && children(data)}
    </div>
  );
}

export default Loader;
