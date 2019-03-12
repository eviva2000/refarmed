import React, { Component } from "react";
// import Light from "../asset/light-pic.png";
import prepare from "../asset/prepare.png";
import sow from "../asset/plantnew.png";
import inQueue from "../asset/inqueue2.png";
import inProcess from "../asset/inprocessnew.png";
import paused from "../asset/pause.png";
import Subtask from "./Subtask";

//Gets properties from the parent Orders, maps through the array and returns a list of names ,tasks and task status.
class Order extends Component {
  state = {
    pageChange: false
  };
  handlePageChange = e => {
    console.log(e);
    this.setState({ pageChange: true });
  };

  renderStatus(param) {
    switch (param) {
      case "In queue":
        return <img src={inQueue} alt="queue" />;
      case "In process":
        return <img src={inProcess} alt="inprocess" />;
      case "paused":
        return <img src={paused} alt="paused" />;
      default:
        return null;
    }
  }
  renderImage(param) {
    switch (param) {
      case "1":
        return <img src={prepare} alt="" />;
      case "2":
        return <img src={sow} alt="" />;
      case "3":
        return <img src={prepare} alt="" />;
      default:
        return null;
    }
  }

  render() {
    console.log(this.props);
    const oredrList = this.props.data.map(item => {
      return (
        <div key={item.id} id="wrapper">
          <section id="firstpart">
            <h1>{item.title.rendered}</h1>
            <h3>Order-id :{item.acf.orderid}</h3>
          </section>
          <section id="secondpart" onClick={() => this.handlePageChange(item)}>
            <div id="imgwrapper">{this.renderImage(item.acf.Taskid)}</div>
            <div id="status-wrapper">
              <h4>status:</h4>
              {this.renderStatus(item.acf.Taskstatus)}
            </div>
          </section>

          {this.state.pageChange ? (
            <Subtask>
              <h1>{item.title.rendered}</h1>
            </Subtask>
          ) : null}
        </div>
      );
    });
    return <div>{oredrList};</div>;
  }
}

export default Order;
