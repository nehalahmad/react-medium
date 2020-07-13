import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";

import Auxilliary from "../Auxilliary/Auxilliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";

import HeroBanner from "../../components/Navigation/HeroBanner/HeroBanner";

class Layout extends Component {
  render() {
    return (
      <Auxilliary>
        <Toolbar isAuth={this.props.isAuthenticated} />
        <HeroBanner />
        <Container>{this.props.children}</Container>
      </Auxilliary>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(Layout);
