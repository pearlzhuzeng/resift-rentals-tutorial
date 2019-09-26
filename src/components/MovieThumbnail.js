import React from 'react';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: 104,
    marginRight: 8,
    textDecoration: 'none',
    width: 240,
  },
  name: {
    alignSelf: 'flex-end',
    color: 'white',
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 8,
  },
}));

function MovieThumbnail({ className, movie }) {
  const classes = useStyles();
  const { name, imageUrl } = movie;

  return (
    <div
      className={classNames(classes.root, className)}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)), url(${imageUrl})`,
        backgroundSize: 'cover',
      }}
    >
      <h3 className={classes.name}>{name}</h3>
    </div>
  );
}

export default MovieThumbnail;
