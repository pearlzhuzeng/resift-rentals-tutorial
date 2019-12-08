import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// Components
import AppBar from 'components/AppBar';
import Genre from 'components/Genre';
import MovieDrawer from 'components/MovieDrawer';
// ReSift
import { Guard, useDispatch, isLoading, useStatus } from 'resift';
// Fetches
import getGenres from 'fetches/getGenres';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  genre: {
    margin: '24px 0',
  },
  spinner: {
    color: 'white',
  },
}));

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const status = useStatus(getGenres);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);
  return (
    <Router>
      <AppBar />
      {isLoading(status) && <CircularProgress className={classes.spinner} />}
      <Guard fetch={getGenres}>
        {genres =>
          genres.map(genre => <Genre key={genre.id} genre={genre} className={classes.genre} />)
        }
      </Guard>
      <MovieDrawer />
    </Router>
  );
}
export default App;
