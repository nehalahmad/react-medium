import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

import axios from "../../axios";

import * as actions from "../../store/actions";

import Article from "../../components/Article/Article";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Articles extends Component {
  constructor(props) {
    super(props);

    this.addArticleClickHandler = this.addArticleClickHandler.bind(this);
  }

  componentDidMount() {
    this.props.onFetchArticles(this.props.limit, this.props.offset);
  }

  addArticleClickHandler() {
    this.props.history.push("/add-article");
  }

  render() {
    const { articles } = this.props;

    let renderedArticles = this.props.error ? (
      <p>Articles cann't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (articles.length) {
      renderedArticles = articles.map((article) => (
        <Article article={article} key={article.slug} />
      ));
    } else {
      renderedArticles = <p>No Articles are here...yet</p>;
    }

    return (
      <div>
        <Button varient="primary" onClick={this.addArticleClickHandler}>
          Add Article
        </Button>
        {renderedArticles}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  articles: state.article.articles,
  error: state.article.error,
  username: state.auth.user ? state.auth.user.username : "",
  limit: state.article.limit,
  offset: state.article.offset,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchArticles: (limit, offset) =>
    dispatch(actions.fetchArticles(limit, offset)),
  onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(Articles, axios));
