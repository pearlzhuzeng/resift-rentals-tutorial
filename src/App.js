import React, { useEffect } from 'react';
// Components
import AppBar from 'components/AppBar';
import Loader from 'components/Loader';
import Genre from 'components/Genre';
// ReSift
import { useDispatch } from 'resift';
// Fetches
import genresFetch from 'fetches/genresFetch';
// Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {},
  genre: {
    margin: '8px 0',
  },
}));
function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(genresFetch());
  }, [dispatch]);
  return (
    <>
      <AppBar />
      <Loader fetch={genresFetch}>
        {genres =>
          genres.map(genre => <Genre key={genre.id} className={classes.genre} genre={genre} />)
        }
      </Loader>
    </>
  );
}
export default App;
