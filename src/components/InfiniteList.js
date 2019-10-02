import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
// ReSift
import { useFetch, isLoading, useDispatch, isNormal } from 'resift';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  spinnerContainer: {
    width: '100%',
    position: 'relative',
  },
  spinner: {
    color: 'white',
    position: 'absolute',
    top: '20%',
  },
}));

function InfiniteList({ children, className, fetch }) {
  const classes = useStyles();
  // State
  const [hitScrollEnd, setHitScrollEnd] = useState(false);
  // Fetches
  const [data, status] = useFetch(fetch);
  const dispatch = useDispatch();
  // Ref
  const scrollAnchorRef = useRef(null);
  const dataRef = useRef(data);

  const handleScroll = () => {
    const scrollAnchor = scrollAnchorRef.current;
    if (!scrollAnchor) return;

    const { left } = scrollAnchor.getBoundingClientRect();
    const { width } = document.body.getBoundingClientRect();
    setHitScrollEnd(width - left > 0);
  };

  useLayoutEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    const data = dataRef.current;
    if (!hitScrollEnd) return;
    if (!data) return;

    const { pageSize, currentPageNumber, totalNumberOfPages } = data.paginationMeta;
    if (currentPageNumber * pageSize >= totalNumberOfPages) return;

    dispatch(fetch(currentPageNumber + 1)).then(() => {
      handleScroll();
    });
  }, [hitScrollEnd, dispatch, fetch]);

  return (
    <div className={classNames(classes.root, className)} onScroll={handleScroll}>
      {isNormal(status) && children(data)}
      <div ref={scrollAnchorRef} />
      {/* This ref div needs to stay after the children, otherwise it will only re-fetch once*/}
      {isLoading(status) && (
        <div className={classes.spinnerContainer}>
          <CircularProgress className={classes.spinner} />
        </div>
      )}
    </div>
  );
}

export default InfiniteList;
