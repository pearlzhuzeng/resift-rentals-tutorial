import React from 'react';
import { Link } from 'react-router-dom';
// Fetches
import { useDispatch, useFetch } from 'resift';
import makeMovieFetch from 'fetches/makeMovieFetch';
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

  const movieFetch = makeMovieFetch(id);
  const [movieData] = useFetch(movieFetch);
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    // Don't fetch if the data is already there
    if (movieData) return;

    dispatch(movieFetch());
  };

  return (
    <Link
      className={classNames(classes.root, className)}
      to={`/movies/${id}`}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.9)), url(${imageUrl})`,
        backgroundSize: 'cover',
      }}
      onMouseEnter={handleMouseEnter}
    >
      <h3 className={classes.name}>{name}</h3>
    </Link>
  );
}

export default MovieThumbnail;
