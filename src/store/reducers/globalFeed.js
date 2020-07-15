import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  globalFeeds: [],
  globalFeedsCount: 0,
  loading: false,
  error: null,
  limit: 12,
  offset: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GLOBAL_FEEDS_START:
      return updateObject(state, { loading: true });
    case actionTypes.FETCH_GLOBAL_FEEDS_SUCCESS:
      return updateObject(state, {
        globalFeeds: action.globalFeeds,
        globalFeedsCount: action.globalFeedsCount,
        loading: false,
      });
    case actionTypes.FETCH_GLOBAL_FEEDS_FAIL:
      return updateObject(state, { loading: false, error: action.error });
    case actionTypes.SET_GLOBAL_FEEDS_PAGINATION_PARAMS:
      return updateObject(state, {
        limit: action.limit,
        offset: action.offset,
      });
    default:
      return state;
  }
};

export default reducer;
