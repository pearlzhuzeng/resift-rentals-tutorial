import React, { useState } from 'react';
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
  const { name, synopsis } = draftMovie;

  const handleChangeName = e => {
    setDraftMovie({ ...draftMovie, name: e.target.value });
  };

  const handleChangeSynopsis = e => {
    setDraftMovie({ ...draftMovie, synopsis: e.target.value });
  };

  const handleCancel = () => {};
  const handleSave = () => {};

  return (
    <div className={classes.root}>
      <Dialog open={true} aria-labelledby="form-dialog-title">
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
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button variant="outlined" onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default MovieForm;
