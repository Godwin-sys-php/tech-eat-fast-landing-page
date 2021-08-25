import url from './Url';

export function getWithMenuFromSlug(slug) {
  const init = {
    method: 'GET'
  };

  return fetch(`${url}/restaurant/slug/${slug}/withMenusAndDishes`, init)
    .then(res => res.json());
}

export function getOneTable(idTable, idRestaurant) {
  const init = {
    method: 'GET'
  };

  return fetch(`${url}/restaurant/${idRestaurant}/tables/${idTable}`, init)
    .then(res => res.json());
}