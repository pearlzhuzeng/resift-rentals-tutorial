import React, { useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
// Fetches
import { Guard, useDispatch, useStatus, isLoading, isNormal } from 'resift';
import makeGetMovie from 'fetches/makeGetMovie';
// Components
import MovieForm from 'components/MovieForm';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import { Button, Drawer, CircularProgress } from '@material-ui/core';

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

function MovieDrawer() {
  const classes = useStyles();
  const match = useRouteMatch('/movies/:id');
  const id = match && match.params.id;
  const open = !!match;
  const getMovie = id && makeGetMovie(id);
  const dispatch = useDispatch();
  const history = useHistory();
  const status = useStatus(getMovie);

  useEffect(() => {
    // Don't fetch if the data is already there
    if (!getMovie) return;
    if (isNormal(status)) return;

    dispatch(getMovie());
  }, [getMovie, dispatch, status]);

  const handleEdit = () => {
    history.push(`/movies/${id}/edit`);
  };

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
        <Guard fetch={getMovie}>
          {movie => (
            <>
              <div>
                <Link className={classes.linkBack} to="/">
                  ⬅ Back
                </Link>
                <Button className={classes.buttonEdit} onClick={handleEdit}>
                  Edit
                </Button>
                <MovieForm movie={movie} />
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
        </Guard>
      </div>
    </Drawer>
  );
}

export default MovieDrawer;
