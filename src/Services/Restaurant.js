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

export function sendFeedback(toSend, idRestaurant) {
  const init = {
    method: "POST",
    body: JSON.stringify(toSend),
    headers: new Headers({
      "Content-Type": "application/json; charset=UTF-8"
    })
  };

  return fetch(`${url}/restaurant/${idRestaurant}/feedback`, init)
    .then(res => res.json());
}