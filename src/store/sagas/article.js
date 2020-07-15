import { put } from "redux-saga/effects";

import axios from "../../axios";
import * as actions from "../actions";

export function* fetchArticlesSaga(action) {
  yield put(actions.fetchArtilesStart());

  try {
    const access_token = localStorage.getItem("token");

    const response = yield axios.get(
      `articles?author=${action.author}&limit=${action.limit}&offset=${action.offset}`,
      { headers: { Authorization: `Token ${access_token}` } }
    );

    yield put(
      actions.fetchArtilesSuccess(
        response.data.articles,
        response.data.articlesCount
      )
    );
  } catch (error) {
    yield put(actions.fetchArtilesFail(error));
  }
}

export function* addArticleSaga(action) {
  yield put(actions.addArticleStart());

  try {
    const article = {
      article: {
        title: action.title,
        description: action.description,
        body: action.body,
        tagList: action.tagList.split(", "),
      },
    };
    const access_token = localStorage.getItem("token");

    let response = null;
    if (action.slug) {
      response = yield axios.put(`articles/${action.slug}`, article, {
        headers: { Authorization: `Token ${access_token}` },
      });
    } else {
      response = yield axios.post("articles", article, {
        headers: { Authorization: `Token ${access_token}` },
      });
    }

    yield put(actions.addArticleSuccess(response.data.article));
  } catch (error) {
    yield put(actions.addArticleFail(error));
  }
}

export function* fetchArticleSaga(action) {
  yield put(actions.fetchArticleStart());

  try {
    const response = yield axios.get(`articles/${action.slug}`);
    yield put(actions.fetchArticleSuccess(response.data.article));

    const commentsResponse = yield axios.get(
      `articles/${action.slug}/comments`
    );
    yield put(actions.fetchCommentsSuccess(commentsResponse.data.comments));
  } catch (error) {
    console.log(error);

    yield put(actions.fetchArticleFail(error));
  }
}

export function* deleteArticleSaga(action) {
  try {
    const access_token = localStorage.getItem("token");

    yield axios.delete(`articles/${action.slug}`, {
      headers: { Authorization: `Token ${access_token}` },
    });

    yield put(actions.deleteArticleSuccess(action.slug));
  } catch (error) {
    console.log(error);
  }
}

export function* addCommentSaga(action) {
  yield put(actions.addCommentStart());

  try {
    const comment = {
      comment: {
        body: action.comment,
      },
    };

    const access_token = localStorage.getItem("token");

    const response = yield axios.post(
      `articles/${action.slug}/comments`,
      comment,
      { headers: { Authorization: `Token ${access_token}` } }
    );

    yield put(actions.addCommentSuccess(response.data.comment));
  } catch (error) {
    yield put(actions.addCommentFail(error));
  }
}

export function* deleteCommentSaga(action) {
  try {
    const access_token = localStorage.getItem("token");

    yield axios.delete(`articles/${action.slug}/comments/${action.id}`, {
      headers: { Authorization: `Token ${access_token}` },
    });

    yield put(actions.deleteCommentSuccess(action.id));
  } catch (error) {
    console.log(error);
  }
}
