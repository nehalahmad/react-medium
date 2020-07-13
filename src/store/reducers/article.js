import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  articles: [],
  articleCount: 0,
  loading: false,
  error: null,
  limit: 10,
  offset: 0,
};

const addArticleSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    articles: state.articles.concat(action.article),
    articleCount: state.articleCount + 1,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ARTICLES_START:
      return updateObject(state, { loading: true });
    case actionTypes.FETCH_ARTICLES_SUCCESS:
      return updateObject(state, {
        articles: action.articles,
        articlesCount: action.articlesCount,
        loading: false,
      });
    case actionTypes.FETCH_ARTICLES_FAIL:
      return updateObject(state, { loading: false });
    case actionTypes.SET_ARTICLE_PAGINATION_PARAMS:
      return updateObject(state, {
        limit: action.limit,
        offset: action.offset,
      });
    case actionTypes.ADD_ARTICLE_SUCCESS:
      return addArticleSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
