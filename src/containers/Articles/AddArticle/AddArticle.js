import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import ArticleForm from "../../../components/Article/ArticleForm";
import Spinner from "../../../components/UI/Spinner/Spinner";

import * as actions from "../../../store/actions";

class AddArticle extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.article.slug) {
      this.props.history.push(`/article/${this.props.article.slug}`);
    }
  }

  render() {
    let form = null;

    if (this.props.loading) {
      form = <Spinner />;
    }

    let authRedirect = !this.props.isAuthenticated ? (
      <Redirect to={this.props.authRedirectPath} />
    ) : null;

    return (
      <div>
        {form}
        {authRedirect}
        <ArticleForm history={this.props.history} />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.article.loading,
  error: state.article.error,
  isAuthenticated: state.auth.token !== null,
  authRedirectPath: state.auth.authRedirectPath,
  article: state.article.article,
});

const mapDispatchToProps = (dispatch) => ({
  onAddArticle: (title, description, body, tagList) =>
    dispatch(actions.addArticle(title, description, body, tagList)),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddArticle);
