export const URL = 'https://jsonplaceholder.typicode.com';

export const options = (method, url, data) => {
  return {
    method,
    url,
    data,
  };
};

export const errorInformation = (message) => {
  throw new Error(message);
};
