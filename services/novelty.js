import { Fetch } from '../utils/fetcher';


export const getNovelty = async (params, body) => {
    const request = await Fetch.post('novelty-goods', params, {
      body: JSON.stringify(body)
    });
    return request;
  };
  export const getNoveltyFilters = async params => {
    const request = await Fetch.get('novelty-filters', params, {});
    return request.data;
  };

  