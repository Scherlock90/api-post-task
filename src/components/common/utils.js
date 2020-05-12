export const compareData = (data, key, compareParameter) =>
  data.filter(item => item[key] === compareParameter);
