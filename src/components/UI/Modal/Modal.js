import React, { Component } from "react";
import "./Modal.css";

import Auxilliary from "../../../hoc/Auxilliary/Auxilliary";
import Backdrop from "../../UI/Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <Auxilliary>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className="modal"
          style={{
            transform: this.props.show ? "translate(0)" : "translate(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Auxilliary>
    );
  }
}

export default Modal;
