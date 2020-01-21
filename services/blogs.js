import { Fetch } from '../utils/fetcher';

export const getBlogs = async (params) => {
  const serverData = await Fetch.get('blog', params, {});
  return serverData;
};
