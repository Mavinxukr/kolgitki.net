import { createContext } from 'react';
function noop() {}

export const BlogContext = createContext({
  blogFilters: {},
  addBlogFilter: noop,
  clearBlogFilters: noop,
  removeBlogFilter: noop,
  setBlogSorting: noop,
  setPage: noop
});
