import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import Logout from "./containers/Login/Logout/Logout";
import GlobalFeeds from "./containers/GlobalFeeds/GlobalFeeds";

const asyncLogin = asyncComponent(() => import("./containers/Login/Login"));
const asyncRegister = asyncComponent(() =>
  import("./containers/Register/Register")
);
const asyncArticles = asyncComponent(() =>
  import("./containers/Articles/Articles")
);
const asyncAddArticle = asyncComponent(() =>
  import("./containers/Articles/AddArticle/AddArticle")
);

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/login" component={asyncLogin} />
        <Route path="/register" component={asyncRegister} />
        <Route path="/articles" component={asyncArticles} />
        <Route path="/" exact component={GlobalFeeds} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/login" component={asyncLogin} />
          <Route path="/register" component={asyncRegister} />
          <Route path="/articles" component={asyncArticles} />
          <Route path="/add-article" component={asyncAddArticle} />
          <Route path="/" exact component={GlobalFeeds} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return <Layout>{routes}</Layout>;
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});

export default withRouter(connect(mapStateToProps, null)(App));
