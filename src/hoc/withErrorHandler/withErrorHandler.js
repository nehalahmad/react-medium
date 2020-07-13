import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Auxilliary from "../Auxilliary/Auxilliary";

const withErrorHandler = (WrapperComponent, axios) => {
  return class extends Component {
    state = { error: null };

    componentDidMount() {
      /*
      axios.interceptors.request.use(req => {
        this.setState({ error: null });
      });
      axios.interceptors.response.use(null, error => {
        this.setState({ error });
      });
      */
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      const { error } = this.state;

      return (
        <Auxilliary>
          <Modal show={error != null} modalClosed={this.errorConfirmedHandler}>
            {error ? error.message : null}
          </Modal>
          <WrapperComponent {...this.props} />
        </Auxilliary>
      );
    }
  };
};

export default withErrorHandler;
