import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

import { updateObject, checkValidity } from "../../shared/utility";

import Input from "../../components/UI/Input/Input";

class CommentForm extends Component {
  state = {
    commentForm: {
      comment: {
        value: "",
        elementType: "textarea",
        elementConfig: {
          type: "textarea",
          placeholder: "Write your comment...",
          maxLength: 500,
        },
        validation: { required: true, maxLength: 500 },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
  };

  constructor(props) {
    super(props);

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  inputChangeHandler = (e, inputIdentifier) => {
    const updatedFormElement = updateObject(
      this.state.commentForm[inputIdentifier],
      {
        value: e.target.value,
        valid: checkValidity(
          e.target.value,
          this.state.commentForm[inputIdentifier].validation
        ),
        touched: true,
      }
    );
    const updatedCommentForm = updateObject(this.state.commentForm, {
      [inputIdentifier]: updatedFormElement,
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedCommentForm) {
      formIsValid = updatedCommentForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ commentForm: updatedCommentForm, formIsValid });
  };

  onSubmitHandler(event) {
    event.preventDefault();

    this.props.addCommentHandler(
      this.state.commentForm.comment.value,
      this.props.slug
    );

    const updatedFormElement = updateObject(this.state.commentForm["comment"], {
      value: "",
    });
    const updatedCommentForm = updateObject(this.state.commentForm, {
      comment: updatedFormElement,
    });
    this.setState({ commentForm: updatedCommentForm });
  }

  render() {
    const formElemetsArr = [];
    for (let key in this.state.commentForm) {
      formElemetsArr.push({
        id: key,
        config: this.state.commentForm[key],
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

    return (
      <Form onSubmit={this.onSubmitHandler} name="commentForm">
        {form}
        <Button
          variant="primary"
          type="submit"
          disabled={!this.state.formIsValid}
        >
          SUBMIT
        </Button>
      </Form>
    );
  }
}

export default CommentForm;
