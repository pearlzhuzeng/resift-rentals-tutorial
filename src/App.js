import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Components
import AppBar from 'components/AppBar';
import Genre from 'components/Genre';
import MovieDrawer from 'components/MovieDrawer';
// ReSift
import { useDispatch, useFetch, isNormal, isLoading } from 'resift';
// Fetches
import genresFetch from 'fetches/genresFetch';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  genre: {
    margin: '8px 0',
  },
  spinner: {
    color: 'white',
  },
}));

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [genres, status] = useFetch(genresFetch);

  useEffect(() => {
    dispatch(genresFetch());
  }, [dispatch]);
  return (
    <Router>
      <AppBar />
      {isLoading(status) && <CircularProgress className={classes.spinner} />}
      {isNormal(status) &&
        genres.map(genre => <Genre key={genre.id} genre={genre} className={classes.genre} />)}
      <Route path="/movies/:movieId" component={MovieDrawer} />
    </Router>
  );
}
export default App;
