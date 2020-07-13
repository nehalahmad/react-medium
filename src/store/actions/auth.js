import * as actionTypes from "./actionTypes";

export const login = (email, password) => ({
  type: actionTypes.LOGIN_USER,
  email,
  password,
});

export const loginStart = () => ({ type: actionTypes.LOGIN_START });

export const loginSuccess = (user) => ({
  type: actionTypes.LOGIN_SUCCESS,
  user,
});

export const loginFail = (error) => ({
  type: actionTypes.LOGIN_FAIL,
  error,
});

export const logout = () => ({
  type: actionTypes.INITIATE_LOGOUT,
});

export const logoutSucceed = () => ({
  type: actionTypes.LOGOUT,
});

export const setAuthRedirectPath = (path) => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});

export const fetchCurrentUser = () => ({
  type: actionTypes.FETCH_CURRENT_USER,
});

export const registerStart = () => ({ type: actionTypes.REGISTER_START });

export const registerSuccess = (user) => ({
  type: actionTypes.REGISTER_SUCCESS,
  user,
});

export const registerFail = (error) => ({
  type: actionTypes.REGISTER_FAIL,
  error,
});

export const register = (username, email, password, isSignUp) => ({
  type: actionTypes.REGISTER_USER,
  username,
  email,
  password,
  isSignUp,
});
