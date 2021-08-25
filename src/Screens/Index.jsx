import React from 'react';
import { connect } from 'react-redux';
import { getWithMenuFromSlug } from '../Services/Restaurant';
import {DELETE_ALL_ITEM_ACTION_IN_RESTAURANT, DELETE_ALL_DATA, ADD_DATA} from '../Stores/Reducers/Actions';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      badQrCode: false,
    }
  }

  $_GET = (param) => {
    let vars = {};
    window.location.href.replace(window.location.hash, '').replace(
      /[?&]+([^=&]+)=?([^&]*)?/gi,
      (m, key, value) => {
        vars[key] = value !== undefined ? value : '';
      }
    );

    if (param) {
      return vars[param] ? vars[param] : null;
    }
    return vars;
  };

  componentDidMount() {
    if (this.$_GET("tableId")) {
      this.props.dispatch({
        type: DELETE_ALL_ITEM_ACTION_IN_RESTAURANT,
      });
      this.props.dispatch({
        type: DELETE_ALL_DATA,
      });
      getWithMenuFromSlug(this.props.match.params.slug)
        .then((data) => {
          if (data.find) {
            this.props.dispatch({
              type: ADD_DATA,
              payload: {...data.result, tableId: this.$_GET("tableId")}
            });
            this.props.history.push('/application/home')
          } else {
            this.setState({ badQrCode: true, isLoading: false, });
          }
        })
        .catch(() => {
          this.setState({ badQrCode: true, isLoading: false, });
        });
    } else {
      this.setState({ badQrCode: true, isLoading: false, });
    }
  }

  render() {
    if (this.state.badQrCode) {
      return (
        <div style={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          <div className="container">
            <img
              alt="Logo tech'eat fast"
              src={"/assets/hero.jpg"}
              width="500"
              className="d-inline-block align-top"
            />
            <br />
            <div style={{ fontSize: "150%", fontWeight: "bold" }}>Le QR Code que vous avez utilisé est incorrect ou rompus, veuillez en informez le restaurant</div>
          </div>
        </div>
      )
    } else {
      return (
        <div style={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          <div className="container">
            <img
              alt="Logo tech'eat fast"
              src={"/assets/hero.jpg"}
              width="500"
              className="d-inline-block align-top"
            />
            <br />
            <progress class="progress is-small is-danger" max="100">15%</progress>
          </div>
        </div>
      )
    }
  }
}

export default connect()(Index);