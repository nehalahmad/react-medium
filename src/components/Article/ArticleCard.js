import React from "react";
import { NavLink } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";

import "./ArticleCard.css";

const articleCard = (props) => {
  return (
    <Card style={{ width: "20rem" }}>
      <Card.Img variant="top" src={props.article.author.image} />
      <Card.Body>
        <Card.Title>{props.article.description}</Card.Title>
        <Card.Text>{props.article.body}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Row>
          <Col>
            <NavLink to={`/article/${props.link}`} className="article-title">
              {props.article.title}
            </NavLink>
          </Col>
          {props.currentUser === props.article.author.username ? (
            <Col sm="auto">
              <Button
                variant="light"
                onClick={() =>
                  props.onEditArticleClickHandler(props.article.slug)
                }
              >
                <i className="fa fa-edit"></i>
              </Button>
              <Button
                variant="light"
                onClick={() =>
                  props.onDeleteArticleClickHandler(props.article.slug)
                }
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Col>
          ) : null}
        </Row>

        {/* <small className="text-muted">Last updated 3 mins ago</small> */}
      </Card.Footer>
    </Card>
  );
};

export default articleCard;
