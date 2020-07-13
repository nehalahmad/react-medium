import * as actionTypes from "./actionTypes";

export const fetchArticles = (limit, offset) => ({
  type: actionTypes.FETCH_ARTICLES,
  limit,
  offset,
});

export const fetchArtilesStart = () => ({
  type: actionTypes.FETCH_ARTICLES_START,
});

export const fetchArtilesFail = (error) => ({
  type: actionTypes.FETCH_ARTICLES_FAIL,
  error,
});

export const fetchArtilesSuccess = (articles, articlesCount) => ({
  type: actionTypes.FETCH_ARTICLES_SUCCESS,
  articles,
  articlesCount,
});

export const setPaginationParams = (limit, offset) => ({
  type: actionTypes.SET_ARTICLE_PAGINATION_PARAMS,
  limit,
  offset,
});

export const addArticle = (title, about, description, tags) => ({
  type: actionTypes.ADD_ARTICLE,
  title,
  about,
  description,
  tags,
});

export const addArticleStart = () => ({
  type: actionTypes.ADD_ARTICLE_START,
});

export const addArticleSuccess = (article) => ({
  type: actionTypes.ADD_ARTICLE_SUCCESS,
  article,
});

export const addArticleFail = () => ({
  type: actionTypes.ADD_ARTICLE_FAIL,
});
