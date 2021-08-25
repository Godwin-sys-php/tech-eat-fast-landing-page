import { ADD_ITEM_ACTION_IN_RESTAURANT, DELETE_ITEM_RESTAURANT_ACTION_IN_RESTAURANT, UPDATE_ITEM_ACTION_IN_RESTAURANT, DELETE_ALL_ITEM_ACTION_IN_RESTAURANT } from './Actions';

function CartInRestaurantReducer(state = [], action) {
  switch (action.type) {
    case ADD_ITEM_ACTION_IN_RESTAURANT:
      return [...state, { ...action.payload }];
    case UPDATE_ITEM_ACTION_IN_RESTAURANT:
      return [...[], ...action.payload ];
    case DELETE_ITEM_RESTAURANT_ACTION_IN_RESTAURANT:
      return state.filter((l, i) => i !== action.index);
    case DELETE_ALL_ITEM_ACTION_IN_RESTAURANT:
      return [];
    default:
      return state;
  }
}

export default CartInRestaurantReducer;