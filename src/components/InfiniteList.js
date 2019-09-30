import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
// ReSift
import { useFetch, isLoading, useDispatch, isNormal } from 'resift';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { CircularProgress } from '@material-ui/core';
import _get from 'lodash/get';

const useStyles = makeStyles(theme => ({
  root: { position: 'relative' },
  content: {
    display: 'flex',
    overflow: 'auto',
  },
  spinner: {
    zIndex: theme.zIndex.appBar,
    position: 'absolute',
    top: 0,
    right: 0,
    // transform: 'translate(-50%, -50%)',
  },
}));

function InfiniteList({ children, className, fetch }) {
  const classes = useStyles();
  // State
  const [hitScrollEnd, setHitScrollEnd] = useState(true);
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
    console.log({ left, width, hitScrollEnd: width - left > 0 });
    setHitScrollEnd(width - left > 0);
  };

  useLayoutEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    const data = dataRef.current;
    if (!hitScrollEnd) return;

    const defaultPaginationMeta = {
      pageSize: 10,
      currentPageNumber: 0,
      totalNumberOfPages: Infinity,
    };

    const paginationMeta = _get(data, ['paginationMeta'], defaultPaginationMeta);
    const { pageSize, currentPageNumber, totalNumberOfPages } = paginationMeta;
    if (currentPageNumber * pageSize >= totalNumberOfPages) return;

    dispatch(fetch(currentPageNumber + 1)).then(() => {
      handleScroll();
    });
  }, [hitScrollEnd, dispatch, fetch, data]);

  return (
    <div className={classNames(classes.root, className)} onScroll={handleScroll}>
      <div className={classes.content}>
        {isNormal(status) && (
          <>
            {children(data)}
            <div ref={scrollAnchorRef} />
          </>
        )}
      </div>
      {isLoading(status) && <CircularProgress className={classes.spinner} />}
      {/* This ref div needs to stay after the children, otherwise it will only re-fetch once*/}
    </div>
  );
}

export default InfiniteList;
