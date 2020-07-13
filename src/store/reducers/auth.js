import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  error: null,
  loading: false,
  authRedirectPath: "",
};

const updateStateUser = (state, action) =>
  updateObject(state, {
    token: action.user.token,
    user: action.user,
    error: null,
    loading: false,
    authRedirectPath: "/",
  });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return updateObject(state, { loading: true, error: null });
    case actionTypes.LOGIN_SUCCESS:
      console.log("[reducers auth.js] updating user state");

      return updateStateUser(state, action);
    case actionTypes.LOGIN_FAIL:
      return updateObject(state, { error: action.error, loading: false });
    case actionTypes.LOGOUT:
      return updateObject(state, { token: null, user: null });
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return updateObject(state, { authSetRedirectPath: action.path });
    case actionTypes.REGISTER_START:
      return updateObject(state, { loading: true, error: null });
    case actionTypes.REGISTER_SUCCESS:
      console.log("line #26");
      console.log(action);

      return updateStateUser(state, action);
    case actionTypes.REGISTER_FAIL:
      return updateObject(state, { error: action.error, loading: false });

    default:
      return state;
  }
};

export default reducer;
