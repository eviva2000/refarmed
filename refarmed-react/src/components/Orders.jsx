import React, { Component } from "react";
import Order from "./Order.jsx";
import Header from "./Header";
class Orders extends Component {
  state = {
    data: []
  };

  // fetching data from data-base
  componentDidMount() {
    fetch("http://artingineer.dk/refarmedwordpress/wp-json/wp/v2/posts").then(
      res => {
        res.json().then(result => {
          this.setState({ data: result });
        });
      }
    );
  }
  render() {
    return (
      <div id="orders">
        <Header />
        <h1>TODAY'S TASKS:</h1>
        <Order data={this.state.data} />
      </div>
    );
  }
}

export default Orders;
