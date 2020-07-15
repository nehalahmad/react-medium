import * as actionTypes from "./actionTypes";

export const fetchGlobalFeeds = (limit, offset) => ({
  type: actionTypes.FETCH_GLOBAL_FEEDS,
  limit,
  offset,
});

export const fetchGlobalFeedsStart = () => ({
  type: actionTypes.FETCH_GLOBAL_FEEDS_START,
});

export const fetchGlobalFeedsSuccess = (globalFeeds, globalFeedsCount) => ({
  type: actionTypes.FETCH_GLOBAL_FEEDS_SUCCESS,
  globalFeeds,
  globalFeedsCount,
});

export const fetchGlobalFeedsFail = (error) => ({
  type: actionTypes.FETCH_GLOBAL_FEEDS_FAIL,
  error,
});
