import * as actionTypes from "./actionTypes";

export const fetchArticles = (author, limit, offset) => ({
  type: actionTypes.FETCH_ARTICLES,
  author,
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

export const addArticle = (title, description, body, tagList, slug) => ({
  type: actionTypes.ADD_ARTICLE,
  title,
  description,
  body,
  tagList,
  slug,
});

export const addArticleStart = () => ({ type: actionTypes.ADD_ARTICLE_START });

export const addArticleSuccess = (article) => ({
  type: actionTypes.ADD_ARTICLE_SUCCESS,
  article,
});

export const addArticleFail = (error) => ({
  type: actionTypes.ADD_ARTICLE_FAIL,
  error,
});

export const fetchArticle = (slug) => ({
  type: actionTypes.FETCH_ARTICLE,
  slug,
});

export const fetchArticleStart = () => ({
  type: actionTypes.FETCH_ARTICLE_START,
});

export const fetchArticleSuccess = (article) => ({
  type: actionTypes.FETCH_ARTICLE_SUCCESS,
  article,
});

export const fetchArticleFail = (error) => ({
  type: actionTypes.FETCH_ARTICLE_FAIL,
  error,
});

export const deleteArticle = (slug) => ({
  type: actionTypes.DELETE_ARTICLE,
  slug,
});

export const deleteArticleSuccess = (slug) => ({
  type: actionTypes.DELETE_ARTICLE_SUCCESS,
  slug,
});

export const getArticle = (slug) => ({ type: actionTypes.GET_ARTICLE, slug });

export const addComment = (comment, slug) => ({
  type: actionTypes.COMMENT_ADD,
  comment,
  slug,
});

export const addCommentStart = () => ({ type: actionTypes.COMMENT_ADD_START });

export const addCommentSuccess = (comment) => ({
  type: actionTypes.COMMENT_ADD_SUCCESS,
  comment,
});

export const addCommentFail = (error) => ({
  type: actionTypes.COMMENT_ADD_FAIL,
  error,
});

export const deleteComment = (id, slug) => ({
  type: actionTypes.COMMENT_DELETE,
  id,
  slug,
});

export const deleteCommentSuccess = (id) => ({
  type: actionTypes.COMMENT_DELETE_SUCCESS,
  id,
});

export const fetchComments = (slug) => ({
  type: actionTypes.FETCH_COMMENTS,
  slug,
});

export const fetchCommentsSuccess = (comments) => ({
  type: actionTypes.FETCH_COMMENTS_SUCCESS,
  comments,
});
