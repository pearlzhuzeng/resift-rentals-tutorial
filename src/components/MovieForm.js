import React, { useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
// Fetches
import makeUpdateMovieFetch from 'fetches/makeUpdateMovieFetch';
import { useDispatch } from 'resift';

// Styles
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {},
}));

function MovieForm({ movie }) {
  const classes = useStyles();
  const [draftMovie, setDraftMovie] = useState(movie);
  const { id, name, synopsis } = draftMovie;
  const open = !!useRouteMatch('/movies/:movieId/edit');
  const history = useHistory();
  const updateMovieFetch = makeUpdateMovieFetch(id);
  const dispatch = useDispatch();

  const handleChangeName = e => {
    setDraftMovie({ ...draftMovie, name: e.target.value });
  };

  const handleChangeSynopsis = e => {
    setDraftMovie({ ...draftMovie, synopsis: e.target.value });
  };

  const handleCancel = () => {
    setDraftMovie(movie);
    history.push(`/movies/${id}`);
  };

  const handleSave = async () => {
    await dispatch(updateMovieFetch(draftMovie));
    history.push(`/movies/${id}`);
  };

  return (
    <div className={classes.root}>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Movie Information</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
            <TextField
              label="Name"
              value={name}
              onChange={handleChangeName}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Synopsis"
              value={synopsis}
              onChange={handleChangeSynopsis}
              margin="normal"
              variant="outlined"
              multiline
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button variant="outlined" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default MovieForm;
