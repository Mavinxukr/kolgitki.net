import _ from 'lodash';
import { Fetch } from '../../utils/fetcher';

export const getVacancies = async (params) => {
  const serverData = await Fetch.get('vacancies', params, {});
  return serverData;
};

export const sendCandidate = async (params, body) => {
  const formData = new FormData();
  _.forIn(body, (value, key) => {
    formData.append(key, value);
  });
  const serverData = await fetch('https://backkolgot.mavinx.com/api/vacancy-answer', {
    method: 'POST',
    body: formData,
  });
  const response = await serverData.json();
  return response;
};
