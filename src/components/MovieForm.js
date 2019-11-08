import React, { useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
// Fetches
import makeUpdateMovie from 'fetches/makeUpdateMovie';
import { useDispatch, isLoading, useStatus } from 'resift';
// Styles
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';

function MovieForm({ movie }) {
  const [draftMovie, setDraftMovie] = useState(movie);
  const { id, name, synopsis } = draftMovie;
  const open = !!useRouteMatch('/movies/:movieId/edit');
  const history = useHistory();
  const updateMovie = makeUpdateMovie(id);
  const status = useStatus(updateMovie);
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
    await dispatch(updateMovie(draftMovie));
    history.push(`/movies/${id}`);
  };

  return (
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
          {isLoading(status) ? <CircularProgress size={24} color="inherit" /> : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default MovieForm;
