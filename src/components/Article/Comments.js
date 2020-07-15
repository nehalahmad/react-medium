import React from "react";
import { Button, Row, Col } from "react-bootstrap";

const Comments = (props) =>
  props.comments.map((comment) => (
    <Row key={comment.id}>
      <Col>
        <Row key={comment.id} className="comment-row">
          <Col>{comment.body}</Col>

          {props.isOwner && (
            <Col sm="auto">
              <Button
                variant="light"
                onClick={() =>
                  props.onDeleteCommentClickHandler(comment.id, props.slug)
                }
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Col>
          )}
        </Row>
        <Row className="justify-content-sm-end">
          <Col sm="auto">
            <small>~ {comment.author.username}</small>
          </Col>
        </Row>
      </Col>
    </Row>
  ));
export default Comments;
