import { put, call } from "redux-saga/effects";

import axios from "../../axios";

import * as actions from "../actions";

export function* registerUserSaga(action) {
  yield put(actions.registerStart());

  const authData = {
    user: {
      username: action.username,
      email: action.email,
      password: action.password,
    },
  };

  try {
    const res = yield axios.post("users", authData);

    yield call(
      [localStorage, "setItem"],
      "user",
      JSON.stringify(res.data.user)
    );
    yield call([localStorage, "setItem"], "token", res.data.user.token);

    yield put(actions.registerSuccess(res.data.user));
  } catch (error) {
    console.log(error);
    console.log(error.response.data.errors);
    yield put(actions.registerFail(error.response.data.errors));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");

  if (!token) {
    yield put(actions.logout());
  } else {
    const user = yield JSON.parse(localStorage.getItem("user"));
    yield put(actions.registerSuccess(user.token, user));
  }
}

export function* loginUserSaga(action) {
  yield put(actions.loginStart());

  const authData = {
    user: {
      email: action.email,
      password: action.password,
    },
  };

  try {
    const res = yield axios.post("users/login", authData);

    yield call(
      [localStorage, "setItem"],
      "user",
      JSON.stringify(res.data.user)
    );
    yield call([localStorage, "setItem"], "token", res.data.user.token);

    yield put(actions.loginSuccess(res.data.user));
  } catch (error) {
    console.log(error);
    console.log(error.response);

    yield put(actions.loginFail(error.response.data.errors));
  }
}

export function* fetchCurrentUserSaga(action) {
  try {
    const access_token = localStorage.getItem("token");

    const res = yield axios.get("user", {
      headers: {
        Authorization: `Token ${access_token}`,
      },
    });

    yield call(
      [localStorage, "setItem"],
      "user",
      JSON.stringify(res.data.user)
    );
    yield call([localStorage, "setItem"], "token", res.data.user.token);

    yield put(actions.loginSuccess(res.data.user));
  } catch (error) {
    console.log(error);
    console.log(error.response);

    yield put(actions.loginFail(error.response.data.errors));
  }
}

export function* logoutSaga() {
  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "user");

  yield put(actions.logoutSucceed());
}
