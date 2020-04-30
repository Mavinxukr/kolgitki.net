import { Fetch } from '../../utils/fetcher';

export const sendFeedback = async (params, body) => {
  const serverData = await Fetch.post('feedback-form', params, {
    body: JSON.stringify(body),
  });
  return serverData;
};
