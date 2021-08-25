import "./Dish.css";
import { connect } from "react-redux";
import {
  DELETE_ITEM_RESTAURANT_ACTION_IN_RESTAURANT,
  UPDATE_ITEM_ACTION_IN_RESTAURANT,
} from "../Stores/Reducers/Actions";
import { useState } from "react";

const DishForCart = ({ dish, index, dispatch, cart }) => {
  let nbre = 0;


  const _getPrice = () => {
    if (dish.optionInfo) {
      return dish.optionInfo.price;
    } else {
      return dish.info.price;
    }
  };

  const _getOption = () => {
    if (dish.optionInfo) {
      return <h4 className="card-subtitle">Option: {dish.optionInfo.name}</h4>;
    }
  };

  const _onPlusPress = () => {
    let newState = cart;
    newState[index] = {
      ...newState[index],
      quantity: newState[index].quantity + 1,
    };
    dispatch({
      type: UPDATE_ITEM_ACTION_IN_RESTAURANT,
      payload: newState,
    });
  };

  const _onMinusPress = () => {
    if (cart[index].quantity > 1) {
      let newState = cart;
      newState[index] = {
        ...newState[index],
        quantity: newState[index].quantity - 1,
      };
      dispatch({
        type: UPDATE_ITEM_ACTION_IN_RESTAURANT,
        payload: newState,
      });
    } else {
      nbre ++;
      if (nbre >= 2) {
        if (window.confirm('Voulez-vous supprimer cette élément du panier ?')) {
          _onDeletePress();
        }
      }
    }
  };

  const _onDeletePress = () => {
    dispatch({
      type: DELETE_ITEM_RESTAURANT_ACTION_IN_RESTAURANT,
      index: parseInt(index),
    });
  }

  return (
    <div className="card-container">
      <div
        style={{
          width: "40%",
          background: `url("${dish.info.imageUrl}") no-repeat center center`,
          backgroundSize: "contain",
        }}
      ></div>
      <div className="card-content">
        <h3 className="card-title">{dish.info.name}</h3>
        <h4 className="card-subtitle">Quantité: {dish.quantity}</h4>
        {_getOption()}
        <h4 className="card-subtitle">Prix: {_getPrice()}$</h4>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <button className="button is-rounded is-small is-warning" onClick={_onMinusPress}>
            <span className="icon is-small">
              <span
                className="iconify"
                style={{ fontSize: 50 }}
                data-icon="akar-icons:minus"
                onClick={_onMinusPress}
              ></span>
            </span>
          </button>
          <button className="button is-rounded is-small is-danger" onClick={_onDeletePress}>
            <span className="icon is-small">
              <span
                className="iconify"
                style={{ fontSize: 50 }}
                data-icon="bytesize:trash"
                onClick={_onDeletePress}
              ></span>
            </span>
          </button>
          <button
            className="button is-rounded is-small is-link"
            onClick={_onPlusPress}
          >
            <span className="icon is-small">
              <span
                className="iconify"
                style={{ fontSize: 50 }}
                data-icon="akar-icons:plus"
                onClick={_onPlusPress}
              ></span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect((state) => ({
  cart: state.cartInRestaurant,
}))(DishForCart);
