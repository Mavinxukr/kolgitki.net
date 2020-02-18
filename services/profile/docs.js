import { Fetch } from '../../utils/fetcher';

export const getDocumentsRequest = async (params) => {
  const serverData = await Fetch.get('user/documents', params, {});
  return serverData;
};

export const deleteDocumentRequest = async (params, body) => {
  const serverData = await Fetch.delete('user/document', params, {
    body: JSON.stringify(body),
  });
  return serverData;
};

export const uploadDocumentsRequest = async (params, body) => {
  const serverData = await Fetch.post('user/documents', params, {
    body: JSON.stringify(body),
  });
  return serverData;
};
