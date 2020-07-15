import React, { Component } from "react";
import { connect } from "react-redux";
import { Pagination, Row, Col, CardColumns } from "react-bootstrap";

import axios from "../../axios";

import * as actions from "../../store/actions";

import ArticleCard from "../../components/Article/ArticleCard";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

export class GlobalFeeds extends Component {
  state = { currentPage: 1 };

  componentDidMount() {
    this.props.onFetchGlobalFeeds(this.props.limit, this.props.offset);
  }

  switchPages(pageNumber) {
    const offset = pageNumber * this.props.limit;
    this.props.onFetchGlobalFeeds(this.props.limit, offset);
    this.setState({ currentPage: offset / 10 });
  }

  render() {
    const { globalFeeds } = this.props;

    let renderedGlobalFeeds = <Spinner />;
    if (this.props.error) {
      renderedGlobalFeeds = <p>Feed's cann't be loaded!</p>;
    } else if (globalFeeds.length) {
      renderedGlobalFeeds = globalFeeds.map((feed) => (
        <ArticleCard
          article={feed}
          key={feed.slug}
          link={feed.slug}
          currentUser={this.props.currentUser}
        />
      ));

      let pages = [];
      for (
        let number = 1;
        number <= Math.round(this.props.globalFeedsCount / this.props.limit);
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
        <Row>
          <Col sm="12">
            <CardColumns>{renderedGlobalFeeds}</CardColumns>
          </Col>
          <Col sm="12">
            <Pagination>{pages}</Pagination>
          </Col>
        </Row>
      );
    }
    return renderedGlobalFeeds;
  }
}

const mapStateToProps = (state) => ({
  globalFeeds: state.globalFeed.globalFeeds,
  globalFeedsCount: state.globalFeed.globalFeedsCount,
  error: state.globalFeed.error,
  currentUser: state.auth.user?.username,
  limit: state.globalFeed.limit,
  offset: state.globalFeed.offset,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchGlobalFeeds: (limit, offset) =>
    dispatch(actions.fetchGlobalFeeds(limit, offset)),
  onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(GlobalFeeds, axios));
