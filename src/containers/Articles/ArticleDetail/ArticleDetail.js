import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Row, Col } from "react-bootstrap";

import WithErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import CommentForm from "../../../components/Article/CommentForm";
import Comments from "../../../components/Article/Comments";
import Spinner from "../../../components/UI/Spinner/Spinner";

import axios from "../../../axios";
import * as actions from "../../../store/actions";

class ArticleDetail extends Component {
  constructor(props) {
    super(props);

    this.deleteArticleClickHandler = this.deleteArticleClickHandler.bind(this);
    this.editArticleClickHandler = this.editArticleClickHandler.bind(this);
  }

  componentDidMount() {
    this.props.onFetchArticle(this.props.match.params.slug);
  }

  deleteArticleClickHandler() {
    if (window.confirm("Are you sure, want to delete this article?")) {
      this.props.onDeleteArticle(this.props.match.params.slug);
      this.props.history.push("/articles");
    }
  }

  editArticleClickHandler() {
    this.props.history.push(`/article/edit/${this.props.match.params.slug}`);
  }

  isOwner() {
    return (
      this.props.isAuthenticated &&
      this.props.currentUser === this.props.article.author.username
    );
  }

  deleteCommentClickHandler = (id, slug) => {
    if (window.confirm("Are you sure want to delete this comment?")) {
      this.props.onDeleteComment(id, slug);
    }
  };

  render() {
    let article = this.props.error ? (
      <p>Article cann't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props?.article?.title) {
      let comments = null;
      if (this.props?.comments?.length) {
        comments = (
          <Comments
            comments={this.props.comments}
            onDeleteCommentClickHandler={this.deleteCommentClickHandler}
            slug={this.props.match.params.slug}
            isOwner={this.isOwner()}
          />
        );
      }

      article = (
        <Row className="justify-content-sm-center">
          <Col sm="7">
            <Row>
              <Col>
                <p className="h2">{this.props.article.title}</p>
                <p className="h5">{this.props.article.description}</p>
                <p className="h6">{this.props.article.body}</p>
              </Col>
              {this.isOwner() && (
                <Col sm="auto">
                  <Button
                    onClick={this.deleteArticleClickHandler}
                    variant="light"
                  >
                    <i className="fa fa-trash"></i>
                  </Button>
                  <Button
                    onClick={this.editArticleClickHandler}
                    variant="light"
                  >
                    <i className="fa fa-edit"></i>
                  </Button>
                </Col>
              )}
            </Row>
            <Row>
              <Col>
                {this.props.isAuthenticated && (
                  <CommentForm
                    addCommentHandler={this.props.onAddComment}
                    slug={this.props.match.params.slug}
                    history={this.props.history}
                  />
                )}
                <br />
                <br />
              </Col>
            </Row>
            <Row>
              <Col>{comments}</Col>
            </Row>
          </Col>
        </Row>
      );
    }

    return article;
  }
}

const mapStateToProps = (state) => ({
  loading: state.article.loading,
  error: state.article.error,
  article: state.article.article,
  comments: state.article.comments,
  isAuthenticated: state.auth.token !== null,
  currentUser: state.auth.user?.username,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchArticle: (slug) => dispatch(actions.fetchArticle(slug)),
  onDeleteArticle: (slug) => dispatch(actions.deleteArticle(slug)),
  onAddComment: (comment, slug) => dispatch(actions.addComment(comment, slug)),
  onDeleteComment: (id, slug) => dispatch(actions.deleteComment(id, slug)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(ArticleDetail, axios));
