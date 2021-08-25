import { createStore, combineReducers } from 'redux';
import CartInRestaurant from './Reducers/CartInRestaurant';
import Data from './Reducers/Data';

export default createStore(combineReducers({
  cartInRestaurant: CartInRestaurant,
  data: Data,
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());