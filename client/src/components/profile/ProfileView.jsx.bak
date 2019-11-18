import React from "react";
import Row from "react-bootstrap/Row";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Left from "../left/left";
import ProfileCenter from "../profileCenter/ProfileCenter";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../app.constants";
import isEqual from "lodash/isEqual";
import { followUser } from "../../actions/userInfoActions";

export default class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coverPicChanged: false,
      coverpic: "",
      coverpicView: "",

      coverSize: ""
    };
    this.onFileUploadCoverPic = this.onFileUploadCoverPic.bind(this);
    this.initProfilePic = this.initProfilePic.bind(this);
    this.editProfile = this.editProfile.bind(this);
  }

  onChangeImg = ({ target: img }) => {
    const height = img.offsetHeight;
    if (height < 300) {
      console.log(height + " " + this.state.coverSize);
      this.setState({ coverSize: "cover" });
    } else {
      console.log(height + " " + this.state.coverSize);
      this.setState({ coverSize: "contain" });
    }
  };

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps, this.props)) {
      this.initProfilePic();
    }
  }

  initProfilePic() {
    const user = this.props.user ? this.props.user[0] : undefined;
    if (user)
      this.setState({
        coverpicView: BASE_URL + user.coverpic,
        coverPicChanged: false
      });
  }
  onFileUploadCoverPic(e) {
    if (!e.target.files.length) {
      return;
    }
    const attachment = Array.from(e.target.files)[0];
    this.setState({ coverpic: attachment, coverPicChanged: true });
    this.loadImage(attachment);
  }
  loadImage(attachment) {
    const reader = new FileReader();
    reader.onload = e => {
      this.setState({ coverpicView: e.target.result });
    };

    reader.readAsDataURL(attachment);
  }
  editProfile() {
    this.setState({ coverPicChanged: false });
    this.props.editProfile({ coverpic: this.state.coverpic });
  }
  onCancel = () => {
    this.componentDidMount();
  };

  followThisUser(user_id) {
    let postData = {
      'user_id': user_id
    }
    followUser(postData);
  }

  render() {
    const user = this.props.userInfo.user
      ? this.props.userInfo.user[0]
      : undefined;
    const { coverSize } = this.state;

    return (
      <section style={{ backgroundColor: "#F5FAFE", paddingTop: "1rem" }}>
        <figure>
          <React.Fragment>
            <div>
              <label style={{ width: "100%" }} htmlFor="cover-pic">
                <div className="cover-pic-img-box ">
                  <img
                    src={
                      user && !this.state.coverPicChanged
                        ? user.coverpic
                        : this.state.coverPicChanged
                          ? this.state.coverpicView
                          : ""
                    }
                    className={`${coverSize}`}
                    onLoad={this.onChangeImg}
                  />
                  {this.state.currentUserState === 1 && <div className="cover-pic-img-content"></div>}
                </div>
              </label>
              <input
                className="d-none"
                type="file"
                id="cover-pic"
                name="cover-pic"
                onChange={this.onFileUploadCoverPic}
              />
            </div>
            {this.state.coverPicChanged && (
              <div className="d-flex mb-2 justify-content-center">
                <Button
                  size="sm"
                  className="mr-3 cover-btn"
                  onClick={this.editProfile}
                >
                  Save
                </Button>
                <Button size="sm cover-btn" onClick={this.onCancel}>
                  Cancel
                </Button>
              </div>
            )}
          </React.Fragment>
        </figure>
        <Container className="content">
          <Row>
            <Col md={2} style={{ position: "absolute", top: "350px" }}>
              <Left
                from="profile"
                partners={this.props.userPartners}
                followers={this.props.userFollowers}
                user={this.props.userInfo.user}
                editProfile={this.props.editProfile}
                currentUserState={this.props.currentUserState}
              />
            </Col>
            <Col md={6} className="offset-md-3">
              <ProfileCenter
                loading={this.props.loading}
                user={this.props.userInfo.user}
                userPublications={this.props.userPublications}
                editProfile={this.props.editProfile}
                currentUserState={this.props.currentUserState}
              />
            </Col>
            <Col md={2}>
              {this.props.currentUserState === 1 ? (
                <Link
                  to="/settings/editprofile"
                  className="mt-2 btn edit-profile-button-background "
                >
                  Edit Profile
                </Link>
              ) : this.props.currentUserState === 0 ? (
                user && user.followed === 1 ? (
                  <button className="mt-2  btn edit-profile-button-background">
                    Connected
                  </button>
                ) : (
                    <button className="mt-2  btn edit-profile-button-background" onClick={(e) => { this.followThisUser(user.id)}}>
                      Connect
                    </button>
                  )
              ) : (
                    ""
                  )}
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}
