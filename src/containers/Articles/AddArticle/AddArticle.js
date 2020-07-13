import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { Form, Col, Row, Button } from "react-bootstrap";

import Input from "../../../components/UI/Input/Input";
import Spinner from "../../../components/UI/Spinner/Spinner";

import { updateObject, checkValidity } from "../../../shared/utility";

import * as actions from "../../../store/actions";

class AddArticle extends Component {
  state = {
    controls: {
      title: {
        value: "",
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Article Title" },
        validation: { required: true },
        valid: false,
        touched: false,
      },
      about: {
        value: "",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "What's this article about?",
        },
        validation: { required: true },
        valid: false,
        touched: false,
      },
      description: {
        value: "",
        elementType: "textarea",
        elementConfig: { type: "textarea", placeholder: "Write your article" },
        validation: { required: true },
        valid: false,
        touched: false,
      },
      tags: {
        value: "",
        elementType: "input",
        elementConfig: { type: "text", placeholder: "article related tags" },
        validation: { required: true },
        valid: false,
        touched: false,
      },
    },
  };

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

    this.props.onAddArticle(
      this.state.controls.title.value,
      this.state.controls.about.value,
      this.state.controls.description.value,
      this.state.controls.tags.value,
      this.state.isSignUp
    );

    this.props.history.push("/articles");
  };

  render() {
    const formElemetsArr = [];
    for (let key in this.state.controls) {
      formElemetsArr.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElemetsArr.map((formElement) => (
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
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = this.props.error ? (
      <p>{this.props.error.message}</p>
    ) : null;

    let authRedirect = !this.props.isAuthenticated ? (
      <Redirect to={this.props.authRedirectPath} />
    ) : null;

    return (
      <Row className="justify-content-md-center">
        <Col sm="6">
          {authRedirect}
          {errorMessage}
          <Form onSubmit={this.onSubmitHandler}>
            {form}
            <Button variant="primary" type="submit">
              SUBMIT
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.article.loading,
  error: state.article.error,
  isAuthenticated: state.auth.token !== null,
  authRedirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = (dispatch) => ({
  onAddArticle: (title, about, description, tags) =>
    dispatch(actions.addArticle(title, about, description, tags)),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddArticle);
