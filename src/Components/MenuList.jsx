import React from "react";

class MenusList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: this.props.selectedItem,
      searchText: this.props.valueSearch,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.valueSearch !== this.props.valueSearch) {
      this.setState({ searchText: this.props.valueSearch });
    }
  }

  _onClick = (index) => {
    this.setState({ selectedItem: index }, () => {
      return this.props.onChange(index);
    });
  };

  _displayMenus = (item, index) => {
    let arr = [];
    arr.push(
      <div
        style={Styles.containerFeedBack}
        onClick={this.props.onFeedBackPress}
      >
        <h2 style={Styles.textSelected}>Feedback</h2>
      </div>
    );
    for (let index in this.props.menus) {
      const item = this.props.menus[index];
      if (index == this.state.selectedItem) {
        arr.push(
          <div
            style={Styles.containerSelected}
            onClick={() => this._onClick(index)}
          >
            <h2 style={Styles.textSelected}>{item.name}</h2>
          </div>
        );
      } else {
        arr.push(
          <div style={Styles.container} onClick={() => this._onClick(index)}>
            <h2 style={Styles.textNotSelected}>{item.name}</h2>
          </div>
        );
      }
    }
    return arr;
  };

  _onClear = () => {
    this.props.handleSearchText("");
  };

  render() {
    const menus = this.props.menus;
    return (
      <div style={{ ...this.props.style }}>
        <p class="control has-icons-left has-icons-right">
          <input
            class="input is-large"
            type="search"
            placeholder="Rechercher..."
            name="query"
            onChange={(event) => {
              this.props.handleSearchText(event.target.value);
            }}
          />
          <span class="icon is-small is-left">
            <span class="iconify" data-icon="fe:search"></span>
          </span>
        </p>
        {this.state.searchText.length > 0 ? null : (
          <div style={{ ...Styles.bigContainer }}>
            {menus.length > 0 ? (
              this._displayMenus()
            ) : (
              <em style={Styles.em}>Aucun menus</em>
            )}
          </div>
        )}
      </div>
    );
  }
}

const Styles = {
  container: {
    backgroundColor: "silver",
    padding: 12.5,
    marginLeft: 15,
    borderRadius: 12.5,
    display: "flex",
    flexDirection: "row",
    whiteSpace: "nowrap",
    cursor: "pointer",
  },
  containerSelected: {
    backgroundColor: "tomato",
    padding: 12.5,
    marginLeft: 15,
    borderRadius: 12.5,
    whiteSpace: "nowrap",
    cursor: "pointer",
  },
  containerFeedBack: {
    backgroundColor: "#007bff",
    padding: 12.5,
    marginLeft: 50,
    borderRadius: 12.5,
    display: "flex",
    flexDirection: "row",
    whiteSpace: "nowrap",
    cursor: "pointer",
  },
  bigContainer: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    display: "flex",
    overflowX: "scroll",
    zIndex: 1000,
    fontSize: "70%",
  },
  textSelected: {
    color: "white",
    fontWeight: "600",
  },
  textNotSelected: {
    color: "black",
  },
  em: {
    fontStyle: "italic",
    textAlign: "center",
  },
};

export default MenusList;
