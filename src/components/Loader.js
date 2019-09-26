import React from 'react';
// ReSift
import { useFetch, isLoading, isNormal } from 'resift';
// Styles
import { CircularProgress } from '@material-ui/core';

function Loader({ children, fetch }) {
  const [data, status] = useFetch(fetch);

  return (
    <div>
      {isLoading(status) && <CircularProgress />}
      {isNormal(status) && children(data)}
    </div>
  );
}

export default Loader;
