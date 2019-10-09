function paginate(list, pageSize, currentPageNumber = 0) {
  if (!pageSize) {
    throw new Error('pageSize is required');
  }

  const startIndex = currentPageNumber * pageSize;
  const endIndex = (currentPageNumber + 1) * pageSize;

  return {
    results: list.slice(startIndex, endIndex),
    paginationMeta: {
      pageSize,
      currentPageNumber: currentPageNumber,
      totalNumberOfPages: list.length,
    },
  };
}

export default paginate;
