import React, { useEffect, useState } from 'react';
// Fetches
import { Guard, useDispatch, useData, useStatus, isLoading } from 'resift';
import makeGetMovies from 'fetches/makeGetMovies';
// Components
import MovieThumbnail from 'components/MovieThumbnail';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Button, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    height: 160,
    padding: 16,
    paddingTop: 4,
  },
  movies: {
    display: 'flex',
    marginTop: 24,
    overflow: 'auto',
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
  loadMoreContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: 'white',
  },
  spinner: {
    color: 'white',
  },
}));

function Genre({ className, genre }) {
  const classes = useStyles();
  const { id, name } = genre;
  const getMovies = makeGetMovies(id);
  const movies = useData(getMovies);
  const status = useStatus(getMovies);
  const dispatch = useDispatch();
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    dispatch(getMovies(0));
  }, [getMovies, dispatch]);

  const handleLoadMore = () => {
    const { pageSize, currentPageNumber, totalNumberOfPages } = movies.paginationMeta;
    if ((currentPageNumber + 1) * pageSize >= totalNumberOfPages) {
      setIsEnd(true);
    }

    dispatch(getMovies(currentPageNumber + 1));
  };

  return (
    <div className={classNames(classes.root, className)}>
      <h2 className={classes.name}>{name}</h2>
      <div className={classes.movies}>
        <Guard fetch={getMovies}>
          {movies =>
            movies.results.map(movie => (
              <MovieThumbnail key={movie.id} className={classes.movie} movie={movie} />
            ))
          }
        </Guard>
        <div className={classes.loadMoreContainer}>
          <Button onClick={handleLoadMore} disabled={isLoading(status) || isEnd}>
            {isLoading(status) ? (
              <CircularProgress className={classes.spinner} />
            ) : isEnd ? (
              'end'
            ) : (
              'more'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Genre;
