import React, { Component } from "react";
import Popup from "../../components/popup/popup";
import { ListGroupItem, Row, Col } from "react-bootstrap";
import { likePost, promotePost } from "../../actions/userPublicationAction";
import "./PublicationListItem.scss";
class PublicationListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postIndex: 0,
      modalShow: false,
      likeCount: props.userPublication.likes,
      promoteCount: props.userPublication.promote,
      isLiked: false,
      isPromoted: false
    };
  }
  showPopup = () => {
    this.setState({ modalShow: true, postIndex: this.props.postIndex });
  };
  handleClose = () => {
    this.setState({ modalShow: false });
  };
  onPrevClick = () => {
    if (this.state.postIndex > 0) {
      this.setState({ postIndex: this.state.postIndex - 1 });
    }
  };
  onNextClick = () => {
    if (this.state.postIndex < this.props.userPublications.length - 1) {
      this.setState({ postIndex: this.state.postIndex + 1 });
    }

    if (this.state.postIndex === this.props.userPublications.length - 1) {
      this.handleClose();
    }
  };
  formatCount(count) {
    if (count) {
      if (count < 1000) {
        return count;
      } else if (count < 1000000) {
        return count / 1000 + "K";
      } else {
        return count / 1000000 + "M";
      }
    } else {
      return "";
    }
  }
  likePost = id => {
    this.setState({ likeCount: this.state.likeCount + 1 });
    likePost(id).then(
      res => {
        this.setState({ likeCount: res.data.count, isLiked: true });
      },
      () => {
        this.setState({ likeCount: this.state.likeCount - 1 });
      }
    );
  };
  promotePost = id => {
    this.setState({ promoteCount: this.state.promoteCount + 1 });
    promotePost(id).then(
      res => {
        this.setState({ promoteCount: res.data.count, isPromoted: true });
      },
      () => {
        this.setState({ promoteCount: this.state.promoteCount - 1 });
      }
    );
  };
  renderText = userPublication => {
    if (
      userPublication.publication_text !== "" &&
      userPublication.publication_img === "0" &&
      userPublication.publication_vid === "0"
    ) {
      return "text";
    } else if (
      userPublication.publication_img !== "0" &&
      userPublication.publication_text === "" &&
      userPublication.publication_vid === "0"
    ) {
      return "image";
    } else if (
      userPublication.publication_img === "" &&
      userPublication.publication_text === "0" &&
      userPublication.publication_vid !== "0"
    ) {
      return "video";
    }
  };
  render() {
    const { index, userPublication, userPublications } = this.props;

    return (
      <div>
        <Popup
          show={this.state.modalShow}
          onHide={this.handleClose}
          onPrevClick={this.onPrevClick}
          onNextClick={this.onNextClick}
          userPublication={userPublications[this.state.postIndex]}
          likePost={this.likePost}
          promotePost={this.promotePost}
          likeCount={this.state.likeCount}
          promoteCount={this.state.promoteCount}
          isLiked={this.state.isLiked}
          isPromoted={this.state.isPromoted}
          formatCount={this.formatCount}
        />
        <ListGroupItem
          key={index}
          style={{ background: "white", padding: ".75rem" }}
          className="m-0 p-0 pl-3"
        >
          <Row>
            <Col md={12} className="p-0">
              <p className="ml-1" style={{ fontSize: "0.9rem", lineHeight: "1" }}>
                {userPublication.first_name}{" "}
              </p>
              <h6>
                <span
                  className="text-info font-italic ml-1"
                  onClick={() => {
                    this.showPopup();
                  }}
                  style={{ fontSize: "10px", cursor: "pointer" }}
                >
                  new {this.renderText(userPublication)} post
                </span>
              </h6>
            </Col>
          </Row>
        </ListGroupItem>
      </div>
    );
  }
}

export default PublicationListItem;
