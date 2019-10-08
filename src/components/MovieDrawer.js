import React, { useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
// Fetches
import { useDispatch, useFetch, isLoading, isNormal } from 'resift';
import makeMovieFetch from 'fetches/makeMovieFetch';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 20,
  },
  drawer: {
    display: 'flex',
    flexDirection: 'column',
    width: 600,
    padding: 16,
    height: '100vh',
  },
  paper: {
    minWidth: 600,
  },
  linkBack: {
    color: 'white',
    marginRight: 16,
  },
  buttonEdit: {
    border: 'solid 1px white',
    color: 'white',
    width: 'fit-content',
    padding: 0,
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
  spinner: {
    color: 'white',
  },
}));

function Movie({ match }) {
  const classes = useStyles();
  const { movieId: id } = match.params;
  const movieFetch = makeMovieFetch(id);
  const dispatch = useDispatch();
  const history = useHistory();
  const open = !!useRouteMatch('/movies/:movieId');
  const [movie, status] = useFetch(movieFetch);

  useEffect(() => {
    // Don't fetch if the data is already there
    if (movie) return;

    dispatch(movieFetch());
  }, [movieFetch, dispatch, movie]);

  return (
    <Drawer
      anchor="right"
      open={open}
      className={classes.root}
      classes={{ paper: classes.paper }}
      onClose={() => history.push('/')}
    >
      <div className={classes.drawer}>
        {isLoading(status) && <CircularProgress className={classes.spinner} />}
        {isNormal(status) && (
          <>
            <div>
              <Link className={classes.linkBack} to="/">
                ⬅ Back
              </Link>
            </div>
            <div className={classes.movieHeader}>
              <div>
                <h1>{movie.name}</h1>
                <p className={classes.score}>
                  {movie.tomatoScore >= 60 ? '🍅 ' : '🤢 '}
                  {movie.tomatoScore}%
                </p>
                <p>
                  <span>{movie.mpaaRating}</span> | <span>{movie.runtime}</span> |{' '}
                </p>
                <p>{movie.genres.join(', ')}</p>
              </div>
              <img src={movie.posterUrl} alt="poster" />
            </div>
            <p>Staring: {movie.actors.join(', ')}</p>
            <p dangerouslySetInnerHTML={{ __html: movie.synopsis }} />
            <div>
              <video className={classes.preview} controls>
                <source src={movie.trailerUrl} type="video/mp4" />
              </video>
            </div>
          </>
        )}
      </div>
    </Drawer>
  );
}

export default Movie;
