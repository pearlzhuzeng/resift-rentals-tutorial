import React, { useEffect } from 'react';
// Components
import AppBar from 'components/AppBar';
import Loader from 'components/Loader';
import Genre from 'components/Genre';
// ReSift
import { useDispatch } from 'resift';
// Fetches
import genresFetch from 'fetches/genresFetch';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(genresFetch());
  }, [dispatch]);
  return (
    <>
      <AppBar />
      <Loader fetch={genresFetch}>
        {genres => genres.map(genre => <Genre key={genre.id} genre={genre} />)}
      </Loader>
    </>
  );
}
export default App;
