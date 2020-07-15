import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../../axios";

import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import ArticleForm from "../../../components/Article/ArticleForm";
import * as actions from "../../../store/actions";

class EditArticle extends Component {
  componentDidMount() {
    this.props.onFetchArticle(this.props.match.params.slug);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.article &&
      prevProps.article.updatedAt !== this.props.article.updatedAt
    ) {
      this.props.history.push(`/article/detail/${this.props.match.params.slug}`);
    }
  }

  render() {
    let articleForm = null;

    if (this.props.article.title) {
      articleForm = (
        <ArticleForm
          article={this.props.article}
          slug={this.props.match.params.slug}
          history={this.props.history}
        />
      );
    }
    return articleForm;
  }
}

const mapStateToProps = (state) => ({
  article: state.article.article,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchArticle: (slug) => dispatch(actions.fetchArticle(slug)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(EditArticle, axios));
