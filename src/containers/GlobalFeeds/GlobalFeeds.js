import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../axios";

import * as actions from "../../store/actions";

import Article from "../../components/Article/Article";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

export class GlobalFeeds extends Component {
  componentDidMount() {
    this.props.onFetchGlobalFeeds(this.props.limit, this.props.offset);
  }

  render() {
    const { globalFeeds } = this.props;

    let renderedGlobalFeeds = this.props.error ? (
      <p>Feed's cann't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (globalFeeds.length) {
      renderedGlobalFeeds = globalFeeds.map((feed) => (
        <Article article={feed} key={feed.slug} />
      ));
    }

    return <div>{renderedGlobalFeeds}</div>;
  }
}

const mapStateToProps = (state) => ({
  globalFeeds: state.globalFeed.globalFeeds,
  error: state.globalFeed.error,
  username: state.auth.user ? state.auth.user.username : "",
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
