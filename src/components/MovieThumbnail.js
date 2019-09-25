import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: 104,
    marginRight: 8,
    width: 240,
  },
  name: {
    alignSelf: 'flex-end',
    color: 'white',
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 8,
  },
}));

function MovieThumbnail({ movie }) {
  const classes = useStyles();
  const { name, imageUrl } = movie;

  return (
    <>
      <div
        className={classes.root}
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)), url(${imageUrl})`,
          backgroundSize: 'cover',
        }}
      >
        <h3 className={classes.name}>{name}</h3>
      </div>
    </>
  );
}

export default MovieThumbnail;
