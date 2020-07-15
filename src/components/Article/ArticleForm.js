import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { Form, Col, Row, Button } from "react-bootstrap";

import Input from "../../components/UI/Input/Input";

import { updateObject, checkValidity } from "../../shared/utility";

import * as actions from "../../store/actions";

class ArticleForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articleForm: {
        title: {
          value: props?.article?.title || "",
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Article Title",
            maxLength: 100,
          },
          validation: { required: true, maxLength: 100 },
          valid: !!props?.article?.title || false,
          touched: false,
        },
        description: {
          value: props?.article?.description || "",
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "What's this article about?",
            maxLength: 200,
          },
          validation: { required: true, maxLength: 200 },
          valid: !!props?.article?.description || false,
          touched: false,
        },
        body: {
          value: props?.article?.body || "",
          elementType: "textarea",
          elementConfig: {
            type: "textarea",
            placeholder: "Write your article",
            maxLength: 500,
          },
          validation: { required: true, maxLength: 500 },
          valid: !!props?.article?.body || false,
          touched: false,
        },
        tagList: {
          value: props?.article?.tagList.join(", ") || "",
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "article related tags",
            maxLength: 100,
          },
          validation: { required: true, maxLength: 100 },
          valid:
            (props?.article?.tagList && props.article.tagList.length) || false,
          touched: false,
        },
      },
      formIsValid: !!props.slug || false,
    };
  }

  inputChangeHandler = (e, inputIdentifier) => {
    const updatedFormElement = updateObject(
      this.state.articleForm[inputIdentifier],
      {
        value: e.target.value,
        valid: checkValidity(
          e.target.value,
          this.state.articleForm[inputIdentifier].validation
        ),
        touched: true,
      }
    );
    const updatedArticleForm = updateObject(this.state.articleForm, {
      [inputIdentifier]: updatedFormElement,
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedArticleForm) {
      formIsValid = updatedArticleForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ articleForm: updatedArticleForm, formIsValid });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();

    // based upon slug we'll add/edit article
    this.props.onAddArticle(
      this.state.articleForm.title.value,
      this.state.articleForm.description.value,
      this.state.articleForm.body.value,
      this.state.articleForm.tagList.value,
      this.props.slug
    );
  };

  onCancelHandler = () => {
    this.props.history.goBack();
  };

  render() {
    const formElemetsArr = [];
    for (let key in this.state.articleForm) {
      formElemetsArr.push({
        id: key,
        config: this.state.articleForm[key],
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

            <Row className="justify-content-sm-center">
              <Col sm="auto">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!this.state.formIsValid}
                >
                  Submit
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button variant="secondary" onClick={this.onCancelHandler}>
                  Cancel
                </Button>
              </Col>
            </Row>
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
  onAddArticle: (title, description, body, tagList, slug) =>
    dispatch(actions.addArticle(title, description, body, tagList, slug)),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleForm);
