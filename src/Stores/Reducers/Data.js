import { ADD_DATA, DELETE_ALL_DATA, } from './Actions';

function CartInRestaurantReducer (state = {}, action) {
  switch (action.type) {
    case ADD_DATA:
      return action.payload;
    case DELETE_ALL_DATA:
      return {};
    default: 
      return state;
  }
}

export default CartInRestaurantReducer; 