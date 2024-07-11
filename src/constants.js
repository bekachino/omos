export const apiUrl = 'http://planup.skynet.kg:8000/planup/';

export const smthIsWrongErrorMessage = 'Что то пошло не так, повторите позже';

export const locationTypes = [
  { key: 'region', value: 'регион' }, {
    key: 'city', value: 'город'
  }, { key: 'dist', value: 'район' }
];

export const formatDate = (date) => {
  const newDate = new Date(date);
  const pad = (num, size) => num.toString().padStart(size, '0');
  
  const year = newDate.getFullYear();
  const month = pad(newDate.getMonth() + 1, 2);
  const day = pad(newDate.getDate(), 2);
  const hours = pad(newDate.getHours(), 2);
  const minutes = pad(newDate.getMinutes(), 2);
  
  return `${day}.${month}.${year}  ${hours}:${minutes}`;
};
