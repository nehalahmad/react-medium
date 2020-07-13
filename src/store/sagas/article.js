import { put } from "redux-saga/effects";

import axios from "../../axios";
import * as actions from "../actions";

export function* fetchArticlesSaga(action) {
  yield put(actions.fetchArtilesStart());

  try {
    const access_token = localStorage.getItem("token");

    const response = yield axios.get(
      `articles/feed?limit=${action.limit}&offset=${action.offset}`,
      {
        headers: {
          Authorization: `Token ${access_token}`,
        },
      }
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
        description: action.about,
        body: action.description,
        tagList: action.tags.split(" "),
      },
    };
    const access_token = localStorage.getItem("token");

    const response = yield axios.post("articles", article, {
      headers: {
        Authorization: `Token ${access_token}`,
      },
    });

    yield put(actions.addArticleSuccess(response.data.article));
  } catch (error) {
    yield put(actions.addArticleFail(error));
  }
}
