import { put } from "redux-saga/effects";

import axios from "../../axios";
import * as actions from "../actions";

export function* fetchGlobalFeedsSaga(action) {
  yield put(actions.fetchGlobalFeedsStart());

  try {
    const response = yield axios.get(
      `articles?limit=${action.limit}&offset=${action.offset}`
    );

    yield put(
      actions.fetchGlobalFeedsSuccess(
        response.data.articles,
        response.data.articlesCount
      )
    );
  } catch (error) {
    yield put(actions.fetchGlobalFeedsFail(error));
  }
}
