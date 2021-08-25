import url from './Url';

export function placeOrderInRestaurant(toSend, idRestaurant) {
  const init = {
    method: "POST",
    body: JSON.stringify(toSend),
    headers: new Headers({
      "Content-Type": "application/json; charset=UTF-8"
    })
  };

  return fetch(`${url}/commands/restaurant/${idRestaurant}/inRestaurant`, init);
}