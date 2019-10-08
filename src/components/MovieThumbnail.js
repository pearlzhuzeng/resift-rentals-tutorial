import React from 'react';
import { Link } from 'react-router-dom';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    textDecoration: 'none',
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
  const { id, name, imageUrl } = movie;

  return (
    <Link
      className={classNames(classes.root, className)}
      to={`/movies/${id}`}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.9)), url(${imageUrl})`,
        backgroundSize: 'cover',
      }}
    >
      <h3 className={classes.name}>{name}</h3>
    </Link>
  );
}

export default MovieThumbnail;
