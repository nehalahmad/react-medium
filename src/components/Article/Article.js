import React from "react";
import "./Article.css";

const article = (props) => {
  return <div className="article">{props.article.title}</div>;
};

export default article;
