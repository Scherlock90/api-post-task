export const URL = 'https://jsonplaceholder.typicode.com';

export const options = (method, url, data) => {
  return {
    method,
    url,
    data,
  };
};

export const optionsAjax = (url, method, body) => (
  {
    url,
    method,
    body
  }
)
