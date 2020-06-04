import { Fetch } from '../../utils/fetcher';
import { cookies } from '../../utils/getCookies';

export const getDocumentsRequest = async (params) => {
  const serverData = await Fetch.get('user/documents', params, {});
  return serverData;
};

export const deleteDocumentRequest = async (params, body) => {
  const serverData = await Fetch.post('user/document', params, {
    body: JSON.stringify(body),
  });
  return serverData;
};

export const uploadDocumentsRequest = async (params, body) => {
  const formData = new FormData();
  body.forEach((item, index) => {
    formData.append(`documents[${index}]`, body[0]);
  });
  const serverData = await fetch('https://back.kolgotki.ml/api/user/documents', {
    method: 'POST',
    headers: {
      Authorization: cookies.get('token'),
    },
    body: formData,
  });

  return serverData.json();
};

export const getProfileWholesaleDocuments = async (params) => {
  const serverData = await Fetch.post('get-wholesale-documents', params, {});
  return serverData;
};
