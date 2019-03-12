import React, { Component } from "react";
class Subtask extends Component {
  state = {};
  styles = {
    left: "0"
  };

  render() {
    console.log(this.props);
    return (
      <section style={this.styles} className="status-page">
        <h1>{this.props.title}</h1>
      </section>
    );
  }
}

export default Subtask;
