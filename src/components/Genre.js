import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
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
    opacity: 0.5,
    padding: 16,
    paddingTop: 4,
    position: 'relative',
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
  },
  spinner: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
}));

function Genre({ className, genre }) {
  const classes = useStyles();
  const { id, name } = genre;
  const scrollAnchorRef = useRef(null);
  const moviesFetch = makeMoviesFetch(id);
  const dispatch = useDispatch();
  const [movies, moviesStatus] = useFetch(moviesFetch);

  const [hitScrollEnd, setHitScrollEnd] = useState(false);

  useEffect(() => {
    dispatch(moviesFetch());
  }, [moviesFetch, dispatch]);

  const handleScroll = () => {
    const scrollAnchor = scrollAnchorRef.current;
    if (!scrollAnchor) return;

    const { left } = scrollAnchor.getBoundingClientRect();
    const { width } = document.body.getBoundingClientRect();
    setHitScrollEnd(width - left > 0);
  };

  const moviesRef = useRef(movies);

  useLayoutEffect(() => {
    moviesRef.current = movies;
  }, [movies]);

  useEffect(() => {
    const movies = moviesRef.current;
    if (!hitScrollEnd) return;
    if (!movies) return;

    const { pageSize, currentPageNumber, totalNumberOfPages } = movies.paginationMeta;
    if (currentPageNumber * pageSize >= totalNumberOfPages) return;

    dispatch(moviesFetch(currentPageNumber + 1)).then(() => {
      handleScroll();
    });
  }, [hitScrollEnd, dispatch, moviesFetch]);

  console.log(movies);

  return (
    <div className={classNames(classes.root, className)}>
      <h2 className={classes.name}>{name}</h2>
      <div className={classes.movies} onScroll={handleScroll}>
        {isNormal(moviesStatus) &&
          movies.results.map(movie => (
            <MovieThumbnail key={movie.id} className={classes.movie} movie={movie} />
          ))}
        <div ref={scrollAnchorRef} />
        {isLoading(moviesStatus) && <CircularProgress className={classes.spinner} />}
      </div>
      )
    </div>
  );
}

export default Genre;
