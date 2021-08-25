import React from "react";
import { getOneDish } from "../Services/Dish";
import {
  ADD_ITEM_ACTION_IN_RESTAURANT,
  UPDATE_ITEM_ACTION_IN_RESTAURANT,
} from "../Stores/Reducers/Actions";
import { connect } from "react-redux";

class ModalDish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: false,
      data: {},
      quantity: 1,
      option: "Scum",
      optionId: null,
      needOption: false,
    };
  }

  componentDidMount() {
    getOneDish(this.props.id)
      .then((data) => {
        if (data.find) {
          console.log("====================================");
          console.log(data.result);
          console.log("====================================");
          this.setState({ isLoading: false, error: false, data: data.result });
        } else {
          this.setState({ isLoading: false, error: true });
        }
      })
      .catch(() => {
        this.setState({ isLoading: false, error: true });
      });
  }

  _onMinusPress = (event) => {
    event.preventDefault();
    if (this.state.quantity > 1) {
      this.setState({ quantity: this.state.quantity - 1 });
    }
  };

  _onPlusPress = (event) => {
    event.preventDefault();
    this.setState({ quantity: this.state.quantity + 1 });
  };

  _displayOptions = () => {
    let arr = [];
    for (let index in this.state.data.options) {
      arr.push(
        <option value={index}>
          {this.state.data.options[index].name} (
          {this.state.data.options[index].price} $)
        </option>
      );
    }
    return arr;
  };

  _handleOption = (event) => {
    this.setState({ option: event.target.value }, () => {
      event.target.value !== "Scum"
        ? this.setState({
            optionId: this.state.data.options[event.target.value].idDishOption,
          })
        : this.setState({ optionId: null });
    });
  };

  _getContent = () => {
    if (this.state.isLoading) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div className="container">
            <progress class="progress is-small is-danger" max="100">
              15%
            </progress>
          </div>
        </div>
      );
    } else if (this.state.error) {
      return <em>Une erreur a eu lieu, réessayez ou contactez-nous</em>;
    } else {
      return (
        <div style={{ textAlign: "left" }}>
          <div className="center">
            <img src={this.state.data.imageUrl} style={{ width: "40%" }} />
            <br />
            <span className="title is-3">{this.state.data.name}</span>
          </div>
          <span className="title is-5">
            Calories: {this.state.data.calories} kcal
          </span>
          <br />
          <em>{this.state.data.description}</em>
          {!this.state.data.available ? (<>
              <div className="notification is-danger" style={{ width: "100%" }}>
                Ce produit est indisponible
              </div>
            </>
          ) : null}
          {this.state.data.options.length > 0 && this.state.data.options ? (
            <>
              <br />
              <br />
              <div className="select is-danger" style={{ width: "100%" }}>
                <select style={{ width: "100%" }} onChange={this._handleOption}>
                  <option value="Scum">Choissisez une option...</option>
                  {this._displayOptions()}
                </select>
              </div>
            </>
          ) : null}
          <br />
          <br />
          <div className="center">
            <span className="title is-3">
              Prix:{" "}
              {this.state.option !== "Scum"
                ? this.state.data.options[this.state.option].price
                : this.state.data.price}
              $
            </span>
          </div>
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <button
              className="button is-rounded is-medium"
              onClick={this._onMinusPress}
            >
              <span className="icon is-medium">
                <span
                  className="iconify"
                  style={{ fontSize: 50 }}
                  data-icon="akar-icons:minus"
                  onClick={this._onMinusPress}
                ></span>
              </span>
            </button>
            <span style={{ fontSize: 40 }}>{this.state.quantity}</span>
            <button
              className="button is-rounded is-medium"
              onClick={this._onPlusPress}
            >
              <span className="icon is-medium">
                <span
                  className="iconify"
                  style={{ fontSize: 50 }}
                  data-icon="akar-icons:plus"
                  onClick={this._onPlusPress}
                ></span>
              </span>
            </button>
          </div>
          {this.state.data.available ? (
            <button
              className="button is-fullwidth"
              style={{ backgroundColor: "#28a745", color: "white" }}
              onClick={this._addInCart}
            >
              Ajouter au panier
            </button>
          ) : (
            <button
              className="button is-fullwidth"
              style={{ backgroundColor: "#28a745", color: "white" }}
              disabled
            >
              Ajouter au panier
            </button>
          )}
          <div className="center">
            <span className="title is-3">
              Total:{" "}
              {this.state.option !== "Scum"
                ? this.state.data.options[this.state.option].price *
                  this.state.quantity
                : this.state.data.price * this.state.quantity}
              $
            </span>
          </div>
          {this.state.needOption ? (
            <div className="notification is-danger">
              Choisissez une option !
            </div>
          ) : null}
        </div>
      );
    }
  };

  _addInCart = (event) => {
    event.preventDefault();

    if (this.state.data.needOption && this.state.option === "Scum") {
      this.setState({ needOption: true });
    } else {
      let addNew = true;
      let capture = null;
      for (let index in this.props.cart) {
        if (
          this.props.cart[index].idDish == this.props.id &&
          this.props.cart[index].idOption == this.state.optionId
        ) {
          addNew = false;
          capture = index;
        }
      }

      if (addNew) {
        this.props.dispatch({
          type: ADD_ITEM_ACTION_IN_RESTAURANT,
          payload: {
            idDish: this.props.id,
            quantity: this.state.quantity,
            idOption: this.state.optionId,
            info: this.state.data,
            optionInfo: this.state.data.options[this.state.option],
          },
        });
        this.props.close();
      } else {
        let newState = this.props.cart;
        newState[capture] = {
          ...newState[capture],
          info: this.state.data,
          quantity: this.state.quantity + newState[capture].quantity,
          optionInfo: this.state.data.options[this.state.option],
        };
        this.props.dispatch({
          type: UPDATE_ITEM_ACTION_IN_RESTAURANT,
          payload: newState,
        });
        this.props.close();
      }
    }
  };

  render() {
    return (
      <div class="modal is-active is-clipped">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
              {this.state.data === null ? "" : this.state.data.name}
            </p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => this.props.close()}
            ></button>
          </header>
          <section className="modal-card-body">{this._getContent()}</section>
          <footer
            className="modal-card-foot"
            style={{ justifyContent: "right" }}
          >
            {this.state.data.available ? (
              <button
                className="button"
                style={{ backgroundColor: "#28a745", color: "white" }}
                onClick={this._addInCart}
              >
                Ajouter au panier
              </button>
            ) : (
              <button
                className="button"
                style={{ backgroundColor: "#28a745", color: "white" }}
                disabled
              >
                Ajouter au panier
              </button>
            )}
            <button
              className="button is-danger"
              onClick={() => this.props.close()}
            >
              Fermer
            </button>
          </footer>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({
  cart: state.cartInRestaurant,
}))(ModalDish);
