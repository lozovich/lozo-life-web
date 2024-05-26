const getQuery = (query: string) => {
  const { location } = window;

  const searchQuery = new URLSearchParams(location.search);
  return searchQuery.get(query);
};

export default getQuery;
