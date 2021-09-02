import React from "react";
import { connect } from "react-redux";
import { sendFeedback } from "../Services/Restaurant";

class ModalFeedBack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: false,
      success: false,
      name: "",
      contact: "",
      content: "",
    };
  }

  _handleName = (event) => {
    this.setState({ name: event.target.value });
  };

  _handleContact = (event) => {
    this.setState({ contact: event.target.value });
  };

  _handleContent = (event) => {
    this.setState({ content: event.target.value });
  };

  _onBtnClick = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true }, () => {
      const toSend = {
        nameOfClient: this.state.name,
        contact: this.state.contact,
        content: this.state.content,
      };
      sendFeedback(toSend, this.props.data.restoInfo.idRestaurant)
        .then((data) => {
          if (data.create) {
            this.setState({ error: false, isLoading: false, success: true });
          } else {
            this.setState({ error: true, isLoading: false });
          }
        })
        .catch((err) => {
          this.setState({ error: true, isLoading: false });
        });
    });
  };

  _getContent = () => {
    if (this.state.success) {
      return (
        <div className="center">
          <span
            style={{ fontSize: "700%", color: "#28a745" }}
            className="iconify"
            data-icon="akar-icons:circle-check"
          ></span>
          <br />
          <span style={{ fontSize: "150%" }}>
            Merci d'avoir donner votre feedback
          </span>
          <br />
          <button className="button is-success is-fullwidth" onClick={() => this.props.close()}>
            Continuez mes achats
          </button>
        </div>
      );
    } else if (this.state.error) {
      return (
        <div className="center">
          <span
            style={{ fontSize: "700%", color: "#dc3545" }}
            class="iconify"
            data-icon="ant-design:close-circle-outlined"
          ></span>
          <br />
          <span style={{ fontSize: "150%" }}>
            Une erreur a eu lieu lors de l'envoi, veuillez en informer le
            restaurant
          </span>
          <br />
          <button className="button is-success is-fullwidth" onClick={() => this.props.close()}>
            Continuez mes achats
          </button>
        </div>
      );
    } else {
      return (
        <>
          <h3 className="center title is-4">
            Merci de prendre le temps de nous envoyez un retour
          </h3>
          <div class="field">
            <label class="label">Nom</label>
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
            <label class="label">Contact (optionnel)</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Un moyen de vous contactez..."
                value={this.state.contact}
                onChange={this._handleContact}
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Message</label>
            <div class="control">
              <textarea
                class="textarea"
                placeholder="Que voulez vous nous dire..."
                value={this.state.content}
                onChange={this._handleContent}
              ></textarea>
            </div>
          </div>
          <button
            style={{ backgroundColor: "#28a745", color: "white" }}
            className={`button is-fullwidth ${
              this.state.isLoading ? "is-loading" : null
            }`}
            onClick={this._onBtnClick}
          >
            Envoyer
          </button>
        </>
      );
    }
  };

  render() {
    return (
      <div class="modal is-active is-clipped">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Envoyer un feedback</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => this.props.close()}
            ></button>
          </header>
          <section className="modal-card-body left">
            {this._getContent()}
          </section>
          <footer
            className="modal-card-foot"
            style={{ justifyContent: "right" }}
          >
            {!this.state.error && !this.state.success ? <button
              className={`button ${this.state.isLoading ? "is-loading" : null}`}
              style={{ backgroundColor: "#28a745", color: "white" }}
              onClick={this._onBtnClick}
            >
              Envoyer
            </button> : <button
              className={`button ${this.state.isLoading ? "is-loading" : null}`}
              style={{ backgroundColor: "#28a745", color: "white" }}
              onClick={() => this.props.close()}
            >
              Continuez mes achats
            </button>}
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
  data: state.data,
}))(ModalFeedBack);
