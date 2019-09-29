import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// ReSift
import { useDispatch } from 'resift';
import makeMovieFetch from 'fetches/makeMovieFetch';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import { Drawer } from '@material-ui/core';
// Components
import Loader from 'components/Loader';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 20,
  },
  drawer: {
    display: 'flex',
    flexDirection: 'column',
    width: 600,
    padding: 16,
    backgroundColor: '#555',
    color: 'white',
    height: '100vh',
  },
  linkBack: {
    color: 'white',
  },
  movieHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  score: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  preview: {
    width: '100%',
    marginTop: 16,
  },
}));

function Movie({ match }) {
  const classes = useStyles();
  const { movieId: id } = match.params;
  const movieFetch = makeMovieFetch(id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(movieFetch());
  }, [movieFetch, dispatch]);

  return (
    <Drawer anchor="right" open={true} className={classes.root}>
      <Loader fetch={movieFetch}>
        {({
          name,
          actors,
          tomatoScore,
          synopsis,
          mpaaRating,
          posterUrl,
          genres,
          runtime,
          trailerUrl,
        }) => (
          <div className={classes.drawer}>
            <Link className={classes.linkBack} to="/">
              ⬅ Back
            </Link>
            <div className={classes.movieHeader}>
              <div>
                <h1>{name}</h1>
                <p className={classes.score}>
                  {tomatoScore >= 60 ? '🍅 ' : '🤢 '}
                  {tomatoScore}%
                </p>
                <p>
                  <span>{mpaaRating}</span> | <span>{runtime}</span> |{' '}
                </p>
                <p>{genres.join(', ')}</p>
              </div>
              <img src={posterUrl} alt="poster" />
            </div>
            <p>Staring: {actors.join(', ')}</p>
            <p dangerouslySetInnerHTML={{ __html: synopsis }} />
            <div>
              <video className={classes.preview} controls>
                <source src={trailerUrl} type="video/mp4" />
              </video>
            </div>
          </div>
        )}
      </Loader>
    </Drawer>
  );
}

export default Movie;
