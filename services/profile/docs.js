import { Fetch } from '../../utils/fetcher';

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
  // let formData = new FormData();
  //
  // //body.forEach((item, index) => {
  //   formData.append(`documents[]`, body);
  // //});
  //
  // console.log(formData.get('documents'));
  //
  // const serverData = await Fetch.post('user/documents', params, {
  //   body: formData,
  // }, false, true);
  // return serverData;
  const data = new FormData();
  const photo = body[0];
  console.log(photo);
  data.append('documents[0]', photo);

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open('POST', 'http://157.245.243.152/api/user/documents');
  xhr.setRequestHeader('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiYmMwNzZiZjcyNDJkNzMyYTAyN2NlZTdjZThmMTExYjEzN2FjMzNkZGZiZWQxZmFhN2Y1MDY5OGVmN2Q1NTgyODAwOWYxZWY4N2VjZWYyNzUiLCJpYXQiOjE1ODIxMDk5MTEsIm5iZiI6MTU4MjEwOTkxMSwiZXhwIjoxNjEzNzMyMzExLCJzdWIiOiIyNiIsInNjb3BlcyI6W119.4E3BuustMgPKxN4y3jrRDy-XNs1tpekf1hZJVxdWI9RqxoivQ_AW4JkOw8XB_vLPUVBmW99yL9P4NxgtEKgLLakwyByTcgNpXBOUmLMYcJChViqjvfMhLHXVGvNMfUv_EQLBsb3Quz56RjkTtXiipoOmNzMEK_720Ftyr5fnxe1eDqle_-snx3OU0NNCywAakBCONn0jmd71cOBTfXLdlVbzqWGapecqK_ZefN2gcN3eC-WQ9yCs8qPXUTeLrOGqdhWcIhEXJq7qAXwzmJsEjVM-3py5MyMwzwB0LWAUKj_CjOtvuRRwyxvcS-857NHGXIBZyTLH0SQsKBrQtqiyA8cm-n869XXrISKjrJuBm7XNfAC6VyOqNmnWM8vpfFVVLEOBFddNAWHXNv0k2Gg8fJK3idGtFqy3IV7gI_0wqd_JDxERQP2UgQ2NfMNexn4JOjQkKSsutKeF4qpJXNSGd-BxWAOu7P7RxvmFqiBZoZjPp4lZuwtfuzmhFowQ0ZXI69ghsAgh7jgsLXtngJRrZGmzB1gTYRwIAP8ZhJ5i5RWZ4BBiBvgROmxM3upIms4scmuVNmTa7_2mTF2fxKJ8K0yu-IGh0B6anXrsomgqenQFg2HeCX4xTowtdVKWAlGHLujaAj1KzR2nJNQa4fjsAyDHQY3bCm55jPGShPkAIfk');

  xhr.send(data);
};
