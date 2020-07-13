import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";

import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";

import { updateObject, checkValidity } from "../../shared/utility";

import * as actions from "../../store/actions/auth";

import "./Register.css";

class Register extends Component {
  state = {
    controls: {
      username: {
        value: "",
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Username" },
        validation: { required: true },
        valid: false,
        touched: false,
      },
      email: {
        value: "",
        elementType: "input",
        elementConfig: { type: "email", placeholder: "E-Mail" },
        validation: { required: true, isEmail: true },
        valid: false,
        touched: false,
      },
      password: {
        value: "",
        elementType: "input",
        elementConfig: { type: "password", placeholder: "Password" },
        validation: { required: true, minLength: 8 },
        valid: false,
        touched: false,
      },
    },
    isSignUp: true,
  };

  componentDidMount() {
    if (this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangeHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      }),
    });
    this.setState({ controls: updatedControls });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();

    this.props.onRegister(
      this.state.controls.username.value,
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  render() {
    const formElemetsArr = [];
    for (let key in this.state.controls) {
      formElemetsArr.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElemetsArr.map((formElement) => {
      return (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          changed={(e) => this.inputChangeHandler(e, formElement.id)}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
        />
      );
    });

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = [];
    if (this.props.error) {
      for (let key in this.props.error) {
        for (let msg of this.props.error[key]) {
          errorMessage.push(<p key={key}>{`${key} ${msg}`}</p>);
        }
      }
    }

    let authRedirect = this.props.isAuthenticated ? (
      <Redirect to={this.props.authRedirectPath} />
    ) : null;

    return (
      <div className="auth">
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.onSubmitHandler}>
          {form}
          <Button variant="primary" type="submit">
            SUBMIT
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  authRedirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = (dispatch) => ({
  onRegister: (username, email, password, isSignUp) =>
    dispatch(actions.register(username, email, password, isSignUp)),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
