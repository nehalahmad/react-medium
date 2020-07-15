import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  articles: [],
  articleCount: 0,
  loading: false,
  error: null,
  limit: 10,
  offset: 0,
  article: {},
  comments: [],
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

    case actionTypes.ADD_ARTICLE_START:
      return updateObject(state, { loading: true });
    case actionTypes.ADD_ARTICLE_SUCCESS:
      return updateObject(state, {
        loading: false,
        article: action.article,
      });
    case actionTypes.ADD_ARTICLE_FAIL:
      return updateObject(state, { loading: false, error: action.error });

    case actionTypes.DELETE_ARTICLE_SUCCESS:
      return updateObject(state, {
        articles: state.articles.filter(({ slug }) => slug !== action.slug),
      });

    case actionTypes.FETCH_ARTICLE_START:
      return updateObject(state, { loading: true });
    case actionTypes.FETCH_ARTICLE_SUCCESS:
      return updateObject(state, { article: action.article, loading: false });
    case actionTypes.FETCH_ARTICLE_FAIL:
      return updateObject(state, { loading: false, error: action.error });
    case actionTypes.GET_ARTICLE:
      console.log(state.articles);
      console.log(action.slug);
      return state.articles.find(({ slug }) => slug === action.slug);

    case actionTypes.COMMENT_ADD_START:
      return updateObject(state, { loading: true });
    case actionTypes.COMMENT_ADD_SUCCESS:
      return updateObject(state, {
        comments: state.comments.concat(action.comment),
        loading: false,
      });
    case actionTypes.COMMENT_ADD_FAIL:
      return updateObject(state, { loading: false, error: action.error });
    case actionTypes.COMMENT_DELETE_SUCCESS:
      return updateObject(state, {
        loading: false,
        comments: state.comments.filter(({ id }) => id !== action.id),
      });
    case actionTypes.FETCH_COMMENTS_SUCCESS:
      return updateObject(state, { comments: action.comments });

    default:
      return state;
  }
};

export default reducer;
