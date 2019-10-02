import React, { useEffect, useState } from 'react';
// Fetches
import { useDispatch } from 'resift';
import makeMoviesFetch from 'fetches/makeMoviesFetch';
// Components
import InfiniteList from 'components/InfiniteList';
import MovieThumbnail from 'components/MovieThumbnail';
// Helpers
import _range from 'lodash/range';
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
  name: {
    color: 'white',
    fontSize: 16,
  },
  movies: {
    display: 'flex',
    marginTop: 24,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
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
  initialSpinner: {
    color: 'white',
  },
}));

function Genre({ className, genre }) {
  const classes = useStyles();
  const { id, name } = genre;
  const moviesFetch = makeMoviesFetch(id);
  const dispatch = useDispatch();
  const [displayInitialSpinner, setDisplayInitialSpinner] = useState(true);

  useEffect(() => {
    const { width } = document.body.getBoundingClientRect();
    const numberOfItemsToFetch = width / (240 + 8);
    const numberOfPagesToFetchTill = Math.ceil(numberOfItemsToFetch / 10);
    const pages = _range(numberOfPagesToFetchTill);

    (async () => {
      for (const page of pages) {
        await dispatch(moviesFetch(page));
        if (page === 0) {
          setDisplayInitialSpinner(false);
        }
      }
    })();
  }, [moviesFetch, dispatch]);

  return (
    <div className={classNames(classes.root, className)}>
      <h2 className={classes.name}>{name}</h2>
      {displayInitialSpinner && (
        <div className={classes.movies}>
          <CircularProgress className={classes.initialSpinner} />
        </div>
      )}
      <InfiniteList className={classes.movies} fetch={moviesFetch}>
        {movies =>
          movies.results.map(movie => (
            <MovieThumbnail key={movie.id} className={classes.movie} movie={movie} />
          ))
        }
      </InfiniteList>
    </div>
  );
}

export default Genre;
