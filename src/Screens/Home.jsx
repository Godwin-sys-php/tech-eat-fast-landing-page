import React from "react";
import { connect } from "react-redux";
import Navbar from "../Components/Navbar";
import { StickyContainer, Sticky } from "react-sticky";
import MenusList from "../Components/MenuList";
import Dish from "../Components/Dish";
import DishForCart from "../Components/DishForCart";
import ModalDish from "../Components/ModalDish";
import ModalCommand from "../Components/ModalCommand";
import ModalFeedBack from "../Components/ModalFeedBack";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      splash: false,
      badGateAway: false,
      isLoading: true,
      indexOfMenu: 0,

      addInCartMode: false,
      displayCartMode: false,
      placeOrderMode: false,
      feedBackMode: false,

      searchText: "",
      itemsForSearch: "",
      info: [],
    };
    this.indexOfDishes = 0;

    this.idOfDishInCart = null;
  }

  componentDidMount() {
    window.onbeforeunload = function () {
      return "Sûre de vouloir quitter";
    };
    if (this.props.data === null || this.props.data === undefined) {
      this.setState({ splash: false, badGateAway: true, isLoading: false, error: true, });
    } else {
      this.indexOfDishes = this.props.data.menus[0].dishes;
      this.setState({ splash: true, badGateAway: false, isLoading: false, info: this.props.data });
    }
  }

  _handleSearchText = (value) => {
    if (value.length > 0) {
      this.setState({ searchText: value }, () => {
        let names = [];
        for (let i in this.state.info.menus) {
          for (let index in this.state.info.menus[i].dishes) {
            names.push(this.state.info.menus[i].dishes[index]);
          }
        }
        let term = this.state.searchText; // search term (regex pattern)
        let search = new RegExp(term, "i"); // prepare a regex object
        let b = names.filter((item) => search.test(item.name));
        this.setState({ itemsForSearch: b });
      });
    } else {
      this.indexOfDishes = this.state.info.menus[this.state.indexOfMenu].dishes;
      this.setState({ searchText: value, itemsForSearch: [] });
    }
  };

  _onChange = (menu) => {
    this.indexOfDishes = this.props.data.menus[menu].dishes;
    this.setState({ indexOfMenu: menu });
  };

  _closeSplash = (event) => {
    event.preventDefault();
    this.setState({ splash: false, badGateAway: false, isLoading: false });
  };

  _onChange = (menu) => {
    this.indexOfDishes = this.props.data.menus[menu].dishes;
    this.setState({ indexOfMenu: menu });
  };

  _onDishPress = (id) => {
    this.idOfDishInCart = id;
    this.setState({ addInCartMode: true });
  };

  _getItems = () => {
    let arr = [];
    if (this.state.searchText.length > 0) {
      if (this.state.itemsForSearch.length > 0) {
        for (let index in this.state.itemsForSearch) {
          arr.push(
            <Dish dish={this.state.itemsForSearch[index]} onClick={this._onDishPress} />
          );
        }
        return arr;
      } else {
        return (
          <div className="center">
            <em>Aucun résultat à votre recherche</em>
          </div>
        )
      }
    } else {
      for (let index in this.indexOfDishes) {
        arr.push(
          <Dish dish={this.indexOfDishes[index]} onClick={this._onDishPress} />
        );
      }
      return arr;
    }
  };

  _close = () => {
    this.setState({ addInCartMode: false, placeOrderMode: false, feedBackMode: false, });
  };

  _displayCartElements = () => {
    if (this.props.cartItems.length > 0) {
      let arr = [];

      for (let index in this.props.cartItems) {
        const el = this.props.cartItems[index];
        arr.push(<DishForCart dish={el} index={index} />);
      }

      return arr;
    } else {
      this.setState({ displayCartMode: false });
    }
  };

  _getTotal = () => {
    let total = 0;
    for (let index in this.props.cartItems) {
      if (this.props.cartItems[index].optionInfo && this.props.cartItems[index].idOption) {
        total += this.props.cartItems[index].quantity * this.props.cartItems[index].optionInfo.price;
      } else {
        total += this.props.cartItems[index].quantity * this.props.cartItems[index].info.price;
      }
    }
    return total;
  }

  render() {
    if (this.state.splash) {
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
            <img
              alt="Logo tech'eat fast"
              src={"/assets/hero.jpg"}
              width="250"
              className="d-inline-block align-top"
            />
            <br />
            <div style={{ fontSize: "150%", fontWeight: "bold" }}>
              Vous allez passer commande sans contact et sans attendre à partir
              de votre table, grâce à{" "}
              <a href="https://techeatfast.com">Tech'Eat Fast</a>
            </div>
            <br />
            <div
              className="button is-danger is-fullwidth"
              onClick={this._closeSplash}
            >
              Continuer
            </div>
          </div>
        </div>
      );
    } else if (this.state.isLoading) {
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
            <img
              alt="Logo tech'eat fast"
              src={"/assets/hero.jpg"}
              width="500"
              className="d-inline-block align-top"
            />
            <br />
            <progress class="progress is-small is-danger" max="100">
              15%
            </progress>
          </div>
        </div>
      );
    } else if (this.state.badGateAway) {
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
            <img
              alt="Logo tech'eat fast"
              src={"/assets/hero.jpg"}
              width="500"
              className="d-inline-block align-top"
            />
            <br />
            <div style={{ fontSize: "150%", fontWeight: "bold" }}>
              Le QR Code que vous avez utilisé est incorrect ou rompus, veuillez
              en informez le restaurant
            </div>
          </div>
        </div>
      );
    } else if (this.state.displayCartMode) {
      return (
        <div>
          <div className="custom-header">
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                this.setState({ displayCartMode: false });
              }}
            >
              <span
                style={{ marginLeft: "10px", marginTop: "5px" }}
                className="iconify"
                data-icon="bx:bx-arrow-back"
              ></span>
            </div>
            <span style={{ marginLeft: "-10px" }}>Panier</span>
            <span></span>
          </div>
          {this._displayCartElements()}
          <br />
          <div style={{ fontSize: "150%", fontWeight: "bold", textAlign: "center" }}>Total: {this._getTotal()}$</div>
          <br />
          <div style={{ textAlign: "center" }}>
            <button
              className="button"
              style={{
                backgroundColor: "#28a745",
                color: "white",
                marginRight: 8,
                marginLeft: 8,
                width: "80%",
              }}
              onClick={(event) => {
                event.preventDefault();
                this.setState({ placeOrderMode: true, });
              }}
            >
              Passer la commande
            </button>
          </div>
          <br />
          <br />
          {this.state.placeOrderMode ? <ModalCommand close={this._close} /> : null}
        </div>
      );
    } else {
      const { restoInfo } = this.props.data;
      const { menus } = this.props.data;
      return (
        <>
          <Navbar />
          <div className="center">
            <img
              src={restoInfo.logoUrl}
              alt="Logo du restaurant"
              style={{ width: "25vh" }}
            />
            <h1 className="title">{restoInfo.name}</h1>
            <StickyContainer>
              <Sticky>
                {({
                  style,
                  isSticky,
                  wasSticky,
                  distanceFromTop,
                  distanceFromBottom,
                  calculatedHeight,
                }) =>
                  !this.state.addInCartMode ? (
                    <MenusList
                      style={style}
                      menus={menus}
                      selectedItem={this.state.indexOfMenu}
                      onChange={this._onChange}
                      handleSearchText={this._handleSearchText}
                      valueSearch={this.state.searchText}
                      onFeedBackPress={() => {
                        this.setState({ feedBackMode: true, });
                      }}
                    />
                  ) : (
                    <span></span>
                  )
                }
              </Sticky>
              {this.state.addInCartMode ? (
                <ModalDish id={this.idOfDishInCart} close={this._close} />
              ) : null}
              {this.state.feedBackMode ? (
                <ModalFeedBack close={this._close} />
              ) : null}
              <div className="left">{this._getItems()}</div>
            </StickyContainer>
          </div>
          {this.props.cartItems.length > 0 ? (
            <div
              className="btn-cart"
              onClick={() => {
                this.setState({ displayCartMode: true });
              }}
            >
              <span
                className="iconify"
                data-icon="fa-solid:shopping-cart"
              ></span>
              &nbsp;&nbsp;Panier & Passer la commande ({this.props.cartItems.length} éléments)
            </div>
          ) : null}
        </>
      );
    }
  }
}

export default connect((state) => ({
  cartItems: state.cartInRestaurant,
  data: state.data,
}))(Home);
