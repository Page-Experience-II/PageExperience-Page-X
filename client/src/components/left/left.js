import React, { Component } from "react";
import {
  faGraduationCap,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Image, Alert, Spinner } from "react-bootstrap";
import { BASE_URL } from "../../app.constants";
import isEqual from "lodash/isEqual";
import ProfilePic from "./profilePic";
import ListGroup from "react-bootstrap/ListGroup";

import "./left.scss";
import PublicationListItem from "../PublicationListItem/PublicationListItem";

export default class Left extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: "",
      avatarChanged: false,
      enlargeImage: false,
      avatarView: ""
    };
    this.onFileUploadAvatar = this.onFileUploadAvatar.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.initAvatar = this.initAvatar.bind(this);
    this.editProfile = this.editProfile.bind(this);
  }
  componentDidMount() {
    this.initAvatar();
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.user, prevProps.user)) {
      this.initAvatar();
    }
  }
  initAvatar() {
    const user = this.props.user ? this.props.user[0] : null;
    if (user)
      this.setState({
        avatarView: BASE_URL + user.avatar,
        avatarChanged: false
      });
  }
  onFileUploadAvatar(e) {
    if (!e.target.files.length) {
      return;
    }
    const attachment = Array.from(e.target.files)[0];
    this.setState({ avatar: attachment, avatarChanged: true });
    this.loadImage(attachment);
  }
  loadImage(attachment) {
    const reader = new FileReader();
    reader.onload = e => {
      this.setState({ avatarView: e.target.result });
    };
    reader.readAsDataURL(attachment);
  }
  editProfile() {
    this.setState({ avatarChanged: false });
    this.props.editProfile({ avatar: this.state.avatar });
  }

  renderPublication = () => {
    return (
      <React.Fragment>
        <ListGroup
          variant="flush"
          className="shadow p-2 mb-5"
          style={{ borderRadius: "1rem" }}
        >
          {this.props.userPublications.map((userPublication, index) => (
            <PublicationListItem
              key={index}
              postIndex={index}
              userPublication={userPublication}
              userPublications={this.props.userPublications}
              loadMoreData={this.loadMoreData}
            />
          ))}
        </ListGroup>
        {this.props.loading && (
          <div className="mt-3 font-weight-bold">
            <Alert variant="light">
              <Spinner animation="grow" size="sm" /> Loading...
            </Alert>
          </div>
        )}
      </React.Fragment>
    );
  };
  render() {
    const user = this.props.user ? this.props.user[0] : null;
    const bg = this.props.from === "profile" ? "bg-lit" : "";
    return (
      <React.Fragment>
        {user && (
          <div className={"left shadow p-2 mb-5 " + bg}>
            {this.props.from === "profile" ? (
              <React.Fragment>
                <div>
                  <label htmlFor="profile-pic">
                    <div className="img-box">
                      <Image
                        src={this.state.avatarView}
                        className="left__avatar"
                      />
                      {this.props.currentUserState === 1 && (
                        <div className="img-content"></div>
                      )}
                    </div>
                  </label>

                  {this.props.currentUserState === 1 && (
                    <input
                      className="d-none"
                      type="file"
                      id="profile-pic"
                      name="profile-pic"
                      onChange={this.onFileUploadAvatar}
                    />
                  )}

                  {this.state.avatarChanged && (
                    <div className="d-flex btn-container justify-content-center mb-2">
                      <Button
                        size="sm"
                        className="mr-3 cover-btn"
                        onClick={this.editProfile}
                      >
                        Save
                      </Button>
                      <Button
                        size="sm  cover-btn"
                        onClick={() => {
                          this.initAvatar();
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </React.Fragment>
            ) : (
              <Image
                onClick={() => {
                  this.setState({ enlargeImage: true });
                }}
                src={this.state.avatarView}
                className="left__avatarhome m-auto"
              />
            )}
            {this.state.enlargeImage && (
              <ProfilePic
                imgsrc={this.state.avatarView}
                close={() => this.setState({ enlargeImage: false })}
              />
            )}
            <h3 className="left__username text-center mt-2">
              {user && user.first_name }
            </h3>
            <p className="left__description text-center">{user && user.bio}</p>
            <div className="left-meta">
              <figure className="left-meta__icon m-0 p-0">
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  className="left-meta__fa"
                />
              </figure>

              <span className="smaller-text mt-1 f10px">
                {" "}
                {user && user.school}
              </span>
            </div>
            <div className="left-meta">
              <figure className="left-meta__icon m-0 p-0 mt-1">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="left-meta__fa"
                />
              </figure>

              <span className="smaller-text mt-1 f10px">
                {" "}
                {user && user.location}{" "}
              </span>
            </div>
            <section className="people-wrapper">
              <div className="people">
                {this.props.followers && (
                  <div className="people__heading d-flex flex-row justify-content-between align-items-baseline">
                    <h6 className="people__title">Audience</h6>
                    <a href="#" className="text-info people__all">
                      <h6>All</h6>
                    </a>
                  </div>
                )}
                {this.props.followers && (
                  <div className="people-avatars">
                    {this.props.followers.map((value, index) => {
                      return (
                        <figure className="people-avatars__figure" key={index}>
                          <Image
                            className="people-avatars__image"
                            src={value.avatar}
                          />
                        </figure>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="people">
                {this.props.partners && (
                  <div className="people__heading d-flex flex-row justify-content-between align-items-baseline">
                    <h6 className="people__title">Partners</h6>
                    <a href="#" className="text-info people__all">
                      <h6>All</h6>
                    </a>
                  </div>
                )}
                {this.props.partners && (
                  <div className="people-avatars">
                    {this.props.partners.map((value, index) => {
                      return (
                        <figure className="people-avatars__figure" key={index}>
                          <Image
                            className="people-avatars__image"
                            src={BASE_URL + value.avatar}
                          />
                        </figure>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
        {this.props.from === "home" ? this.renderPublication() : ""}
      </React.Fragment>
    );
  }
}
