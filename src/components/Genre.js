import React, { useEffect } from 'react';
// Fetches
import { useDispatch } from 'resift';
import makeMoviesFetch from 'fetches/makeMoviesFetch';
// Components
import Loader from 'components/Loader';
import MovieThumbnail from 'components/MovieThumbnail';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'black',
    height: 160,
    margin: '8px 0',
    opacity: 0.5,
    overflow: 'scroll',
    padding: 16,
    paddingTop: 4,
  },
  name: {
    color: 'white',
    fontSize: 16,
  },
  movies: {
    display: 'flex',
    marginTop: 24,
  },
  movie: {
    flex: '0 0 auto',
    marginRight: 8,
    width: 240,
    height: 104,
  },
}));

function Genre({ className, genre }) {
  const classes = useStyles();
  const { id, name } = genre;
  const moviesFetch = makeMoviesFetch(id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(moviesFetch());
  }, [dispatch, moviesFetch]);

  return (
    <div className={classNames(classes.root, className)}>
      <h2 className={classes.name}>{name}</h2>
      <Loader className={classes.movies} fetch={moviesFetch}>
        {movies =>
          movies.results.map(movie => (
            <MovieThumbnail key={movie.id} className={classes.movie} movie={movie} />
          ))
        }
      </Loader>
    </div>
  );
}

export default Genre;
