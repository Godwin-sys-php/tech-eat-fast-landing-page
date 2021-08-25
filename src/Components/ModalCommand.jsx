import React from "react";
import { getOneDish } from "../Services/Dish";
import {
  ADD_ITEM_ACTION_IN_RESTAURANT,
  UPDATE_ITEM_ACTION_IN_RESTAURANT,
} from "../Stores/Reducers/Actions";
import { connect } from "react-redux";
import { getOneTable } from "../Services/Restaurant";
import { placeOrderInRestaurant } from "../Services/Command";

class ModalCommand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: false,
      tableInfo: null,
      name: "",
      comment: "",
      error2: false,
      success: false,
    };
  }

  _getTotal = () => {
    let total = 0;
    for (let index in this.props.cart) {
      if (
        this.props.cart[index].optionInfo &&
        this.props.cart[index].idOption
      ) {
        total +=
          this.props.cart[index].quantity *
          this.props.cart[index].optionInfo.price;
      } else {
        total +=
          this.props.cart[index].quantity * this.props.cart[index].info.price;
      }
    }
    return total;
  };

  componentDidMount() {
    getOneTable(this.props.data.tableId, this.props.data.restoInfo.idRestaurant)
      .then((data) => {
        if (data.find) {
          this.setState({
            error: false,
            isLoading: false,
            tableInfo: data.result,
          });
        } else {
          this.setState({ error: true, isLoading: false });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: true, isLoading: false });
      });
  }

  _handleName = (event) => {
    this.setState({ name: event.target.value });
  }

  _handleComment = (event) => {
    this.setState({ comment: event.target.value });
  }

  _onSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true }, () => {
      const toSend = {
        idTable: this.props.data.tableId,
        deviceId: "ID",
        name: this.state.name,
        comment: this.state.comment,
        paymentMethod: "cash",
        dishes: this.props.cart,
      };
      placeOrderInRestaurant(toSend, this.props.data.restoInfo.idRestaurant)
        .then(res => res.json())
        .then((data) => {
          if (data.create) {
            this.idCommand = data.insertId;
            this.setState({ success: true, error2: false, isLoading: false, });
          } else if (data.invalidForm) {
            this.setState({ error2: false, isLoading: false, });
          } else {
            this.setState({ error2: true, isLoading: false, });
          }
        })
        .catch((error) => {
          this.setState({ error2: true, isLoading: false, });
        });
    });
  }

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
    } else if (this.state.success) {
      window.onbeforeunload =  null;
      return (
        <div className="center">
          <span style={{ fontSize: "700%", color: "#28a745" }} className="iconify" data-icon="akar-icons:circle-check"></span>
          <br />
          <span style={{ fontSize: "150%", }}>Commande passée avec succès</span>
          <br />
          <a href="https://techeatfast.com" className="button is-success is-fullwidth">D'accord</a>
        </div>
      )
    } else {
      return (
        <div>
          <div
            style={{
              fontSize: "150%",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Total: {this._getTotal()}$
          </div>
          <div
            style={{
              fontSize: "150%",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Table: {this.state.tableInfo.tableId}
          </div>
          <div class="field">
            <label class="label">Nom (optionnel): </label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Votre nom..."
                value={this.state.name}
                onChange={this._handleName}
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Commentaire (optionnel): </label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Une petite note..."
                value={this.state.comment}
                onChange={this._handleComment}
              />
            </div>
          </div>
          {this.state.error2 ? <div className='notification is-danger'>Une erreur a eu lieu, réesayez ou parlez-en au restaurant</div> : null}
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
              onClick={this._onSubmit}
            >
              Passer la commande
            </button>
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div class="modal is-active is-clipped">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Passer la commande</p>
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
  data: state.data,
}))(ModalCommand);
