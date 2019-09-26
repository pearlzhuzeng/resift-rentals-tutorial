import React from 'react';
// Components
import MovieThumbnail from 'components/MovieThumbnail';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'black',
    height: 160,
    opacity: 0.5,
    padding: 16,
    paddingTop: 4,
    margin: '8px 0',
  },
  movies: {
    display: 'flex',
    marginTop: 24,
  },
  name: {
    color: 'white',
    fontSize: 16,
  },
}));

function Genre({ className, genre }) {
  const classes = useStyles();
  const { name, movies } = genre;
  return (
    <div className={classNames(classes.root, className)}>
      <h2 className={classes.name}>{name}</h2>
      <div className={classes.movies}>
        {movies.map(movie => (
          <MovieThumbnail key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Genre;
