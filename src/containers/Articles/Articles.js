import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Pagination, CardColumns } from "react-bootstrap";

import axios from "../../axios";

import * as actions from "../../store/actions";

import ArticleCard from "../../components/Article/ArticleCard";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Articles extends Component {
  state = { currentPage: 1 };

  constructor(props) {
    super(props);

    this.addArticleClickHandler = this.addArticleClickHandler.bind(this);
  }

  componentDidMount() {
    this.props.onFetchArticles(
      this.props.currentUser,
      this.props.limit,
      this.props.offset
    );
  }

  switchPages(pageNumber) {
    const offset = pageNumber * this.props.limit;
    this.props.onFetchArticles(
      this.props.currentUser,
      this.props.limit,
      offset
    );
    this.setState({ currentPage: offset / 10 });
  }

  addArticleClickHandler() {
    this.props.history.push("/article/add");
  }

  editArticleClickHandler = (slug) => {
    this.props.history.push(`article/${slug}/edit`);
  };

  deleteArticleClickHandler = (slug) => {
    if (window.confirm("Are your sure want to delete?")) {
      this.props.onArticleDelete(slug);
    }
  };

  render() {
    const { articles } = this.props;

    let renderedArticles = <Spinner />;
    if (this.props.error) {
      renderedArticles = <p>Articles cann't be loaded!</p>;
    } else if (articles.length) {
      renderedArticles = articles.map((article) => (
        <ArticleCard
          key={article.slug}
          article={article}
          link={article.slug}
          currentUser={this.props.currentUser}
          onEditArticleClickHandler={this.editArticleClickHandler}
          onDeleteArticleClickHandler={this.deleteArticleClickHandler}
        />
      ));

      let pages = [];
      for (
        let number = 1;
        number <= Math.round(this.props.articlesCount / this.props.limit);
        number++
      ) {
        pages.push(
          <Pagination.Item
            key={number}
            active={number === this.state.currentPage}
            onClick={() => this.switchPages(number)}
          >
            {number}
          </Pagination.Item>
        );
      }

      return (
        <div>
          <Button variant="success" onClick={this.addArticleClickHandler}>
            <i className="fa fa-plus-circle"></i> Add Article
          </Button>
          <br />
          <br />
          <CardColumns>{renderedArticles}</CardColumns>
          <Pagination>{pages}</Pagination>
        </div>
      );
    }

    return renderedArticles;
  }
}

const mapStateToProps = (state) => ({
  articles: state.article.articles,
  articlesCount: state.article.articlesCount,
  error: state.article.error,
  currentUser: state.auth.user?.username,
  limit: state.article.limit,
  offset: state.article.offset,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchArticles: (author, limit, offset) =>
    dispatch(actions.fetchArticles(author, limit, offset)),
  onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
  onArticleDelete: (slug) => dispatch(actions.deleteArticle(slug)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(Articles, axios));
