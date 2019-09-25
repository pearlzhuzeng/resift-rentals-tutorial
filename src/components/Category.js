import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MovieThumbnail from 'components/MovieThumbnail';

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

function Category({ category }) {
  const classes = useStyles();
  const { name, movies } = category;
  return (
    <div className={classes.root}>
      <h2 className={classes.name}>{name}</h2>
      <div className={classes.movies}>
        {movies.map(movie => (
          <MovieThumbnail key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Category;
