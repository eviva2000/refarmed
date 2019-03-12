import React, { Component } from "react";
import Logo from "../asset/Herfra_logo (1).png";
import user from "../asset/user2.png";
class Header extends Component {
  state = {};
  render() {
    return (
      <div className="headerwrapper">
        <section id="hi">
          <h2>Hi User!</h2>
          <h3> {new Date().toString().slice(4, 15)}</h3>
        </section>
        <img id="logo" src={Logo} alt="herefra-logo" />

        <section className="profile">
          <img src={user} alt="user" />
        </section>
      </div>
    );
  }
}

export default Header;
