import React, { useEffect, useRef, useState, useCallback } from 'react';
// ReSift
import { useFetch, isLoading, useDispatch, isNormal } from 'resift';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { CircularProgress } from '@material-ui/core';
import _get from 'lodash/get';
import useDidDepsChange from './useDidDepsChange';

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

  const handleScroll = useCallback(() => {
    const scrollAnchor = scrollAnchorRef.current;
    if (!scrollAnchor) return;

    const { left } = scrollAnchor.getBoundingClientRect();
    const { width } = document.body.getBoundingClientRect();
    setHitScrollEnd(width - left > 0);
  }, []);

  useEffect(() => {
    if (!hitScrollEnd) return;

    const defaultPaginationMeta = {
      pageSize: 10,
      currentPageNumber: 0,
      totalNumberOfPages: 1,
    };

    const paginationMeta = _get(data, ['paginationMeta'], defaultPaginationMeta);
    const { pageSize, currentPageNumber, totalNumberOfPages } = paginationMeta;
    if (currentPageNumber * pageSize >= totalNumberOfPages) return;

    dispatch(fetch(currentPageNumber + 1)).then(() => {
      handleScroll();
    });
  }, [hitScrollEnd, dispatch, fetch, data, handleScroll]);
  useDidDepsChange({ hitScrollEnd, dispatch, fetch, data, handleScroll });

  return (
    <div className={classNames(classes.root, className)} onScroll={handleScroll}>
      {isLoading(status) && <CircularProgress className={classes.spinner} />}
      <div className={classes.content}>
        {isNormal(status) && children(data)}
        <div ref={scrollAnchorRef} />
      </div>

      {/* This ref div needs to stay after the children, otherwise it will only re-fetch once*/}
    </div>
  );
}

export default InfiniteList;
