import React, { useEffect } from 'react';
// Fetches
import { useDispatch, useFetch, isLoading, isNormal } from 'resift';
import makeMoviesFetch from 'fetches/makeMoviesFetch';
// Components
import MovieThumbnail from 'components/MovieThumbnail';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'black',
    height: 160,
    padding: 16,
    paddingTop: 4,
  },
  movies: {
    display: 'flex',
    marginTop: 24,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  name: {
    color: 'white',
    fontSize: 16,
  },
  movie: {
    flex: '0 0 auto',
    marginRight: 8,
    width: 240,
    height: 104,
    opacity: 0.8,
    transition: 'all 0.5s ease-out',
    '&:hover': {
      opacity: 1,
    },
  },
  spinner: {
    color: 'white',
  },
}));

function Genre({ className, genre }) {
  const classes = useStyles();
  const { id, name } = genre;
  const moviesFetch = makeMoviesFetch(id);
  const [movies, status] = useFetch(moviesFetch);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(moviesFetch());
  }, [dispatch, moviesFetch, id]);

  return (
    <div className={classNames(classes.root, className)}>
      <h2 className={classes.name}>{name}</h2>
      <div className={classes.movies}>
        {isLoading(status) && <CircularProgress className={classes.spinner} />}
        {isNormal(status) &&
          movies.results.map(movie => (
            <MovieThumbnail key={movie.id} className={classes.movie} movie={movie} />
          ))}
      </div>
    </div>
  );
}

export default Genre;
