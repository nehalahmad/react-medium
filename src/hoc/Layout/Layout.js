import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

import Auxilliary from "../Auxilliary/Auxilliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";

import HeroBanner from "../../components/Navigation/HeroBanner/HeroBanner";

class Layout extends Component {
  render() {
    return (
      <Auxilliary>
        <Toolbar isAuth={this.props.isAuthenticated} />
        <HeroBanner />
        <Container fluid>
          <Row>
            <Col md={{span: 8, offset: 2}}>{this.props.children}</Col>
          </Row>
        </Container>
      </Auxilliary>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(Layout);
