import url from './Url';

export function getOneDish(idDish) {
  const init = {
    method: 'GET'
  };

  return fetch(`${url}/dishes/${idDish}`, init)
    .then(res => res.json());
}