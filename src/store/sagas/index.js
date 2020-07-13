import { takeEvery, all, takeLatest } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";

import { logoutSaga, loginUserSaga, registerUserSaga } from "./auth";
import { fetchArticlesSaga, addArticleSaga } from "./article";
import { fetchGlobalFeedsSaga } from "./globalFeed";

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.LOGIN_USER, loginUserSaga),
    takeLatest(actionTypes.REGISTER_USER, registerUserSaga),

    takeEvery(actionTypes.INITIATE_LOGOUT, logoutSaga),
  ]);
}

export function* watchArticle() {
  yield all([
    takeEvery(actionTypes.FETCH_ARTICLES, fetchArticlesSaga),
    takeLatest(actionTypes.ADD_ARTICLE, addArticleSaga),
  ]);
}

export function* watchGlobalFeed() {
  yield takeEvery(actionTypes.FETCH_GLOBAL_FEEDS, fetchGlobalFeedsSaga);
}
