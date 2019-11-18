import React, { Component } from "react";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import ContentCard from "../content-card/content-card";
import "./profileCenter.scss";
import isEqual from "lodash/isEqual";
import { BASE_URL } from "../../app.constants";
import AddCollectionModel from "./AddCollectionModel";

export default class ProfileCenter extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: "updates",
      workPublication: [],
      updatedPublication: [],
      coverPicChanged: false,
      coverpic: "",
      coverpicView: "",
      loading: false,
      showAddCollectionModel: false,
      dummyData: [
        {
          "id": 5,
          "publication_text": "<p>test test</p><p><br></p>",
          "publication_img": "1",
          "publication_vid": "0",
          "publication_subject": null,
          "post": null,
          "user_id": 1,
          "created_at": "2019-10-06T00:45:04.922Z",
          "updated_at": "2019-10-06T00:45:04.922Z",
          "first_name": "Evin",
          "last_name": "Dwarf",
          "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBEQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5ee852737f91d19a6638381b0799ddc1d7214cfb/ppic.jpg",
          "likes": 0,
          "promote": 0,
          "access": "1",
          "publication_type": "2",
          "work_type": "2",
          "liked": 1,
          "promoted": 1,
          "currentuser": 1
        },
        {
          "id": 4,
          "publication_text": "<p>test test</p><p><br></p>",
          "publication_img": "1",
          "publication_vid": "0",
          "publication_subject": null,
          "post": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBDZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e9969452fee34196b780504a18f90b786f1c6bc3/elements-of-art-6.jpg",
          "user_id": 1,
          "created_at": "2019-07-31T05:54:46.945Z",
          "updated_at": "2019-09-18T04:50:06.662Z",
          "first_name": "Evin",
          "last_name": "Dwarf",
          "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBEQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5ee852737f91d19a6638381b0799ddc1d7214cfb/ppic.jpg",
          "likes": 1,
          "promote": 0,
          "access": "1",
          "publication_type": "1",
          "work_type": "null",
          "liked": 1,
          "promoted": 1,
          "currentuser": 1
        },
        {
          "id": 3,
          "publication_text": "<p>testing editing feature </p>",
          "publication_img": "0",
          "publication_vid": "0",
          "publication_subject": null,
          "post": null,
          "user_id": 1,
          "created_at": "2019-07-30T22:57:21.276Z",
          "updated_at": "2019-07-30T22:57:21.276Z",
          "first_name": "Evin",
          "last_name": "Dwarf",
          "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBEQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5ee852737f91d19a6638381b0799ddc1d7214cfb/ppic.jpg",
          "likes": 0,
          "promote": 0,
          "access": "1",
          "publication_type": "2",
          "work_type": "1",
          "liked": 1,
          "promoted": 1,
          "currentuser": 1
        },
        {
          "id": 2,
          "publication_text": "<p>testing editing feature </p>",
          "publication_img": "1",
          "publication_vid": "0",
          "publication_subject": null,
          "post": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--adf5d756bad0ce909829024a5eca83f8294ede9f/elements-of-art-6.jpg",
          "user_id": 1,
          "created_at": "2019-07-30T22:56:26.608Z",
          "updated_at": "2019-07-30T22:56:31.624Z",
          "first_name": "Evin",
          "last_name": "Dwarf",
          "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBEQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5ee852737f91d19a6638381b0799ddc1d7214cfb/ppic.jpg",
          "likes": 1,
          "promote": 0,
          "access": "1",
          "publication_type": "1",
          "work_type": "null",
          "liked": 1,
          "promoted": 1,
          "currentuser": 1
        },
        {
          "id": 1,
          "publication_text": "Hi my First Post",
          "publication_img": "0",
          "publication_vid": "0",
          "publication_subject": null,
          "post": null,
          "user_id": 1,
          "created_at": "2019-07-30T22:55:58.749Z",
          "updated_at": "2019-07-30T22:56:07.789Z",
          "first_name": "Evin",
          "last_name": "Dwarf",
          "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBEQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5ee852737f91d19a6638381b0799ddc1d7214cfb/ppic.jpg",
          "likes": 1,
          "promote": 1,
          "access": "1",
          "publication_type": "1",
          "work_type": null,
          "liked": 1,
          "promoted": 1,
          "currentuser": 1
        },
        {
          "id": 5,
          "publication_text": "hi",
          "publication_img": "1",
          "publication_vid": "0",
          "publication_subject": null,
          "post": null,
          "user_id": 1,
          "created_at": "2019-10-06T00:45:04.922Z",
          "updated_at": "2019-10-06T00:45:04.922Z",
          "first_name": "Evin",
          "last_name": "Dwarf",
          "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBEQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5ee852737f91d19a6638381b0799ddc1d7214cfb/ppic.jpg",
          "likes": 0,
          "promote": 0,
          "access": "1",
          "publication_type": "2",
          "work_type": "2",
          "liked": 1,
          "promoted": 1,
          "currentuser": 1
        },
        {
          "id": 4,
          "publication_text": "",
          "publication_img": "1",
          "publication_vid": "0",
          "publication_subject": null,
          "post": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBDZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e9969452fee34196b780504a18f90b786f1c6bc3/elements-of-art-6.jpg",
          "user_id": 1,
          "created_at": "2019-07-31T05:54:46.945Z",
          "updated_at": "2019-09-18T04:50:06.662Z",
          "first_name": "Evin",
          "last_name": "Dwarf",
          "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBEQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5ee852737f91d19a6638381b0799ddc1d7214cfb/ppic.jpg",
          "likes": 1,
          "promote": 0,
          "access": "1",
          "publication_type": "1",
          "work_type": "null",
          "liked": 1,
          "promoted": 1,
          "currentuser": 1
        },
        {
          "id": 3,
          "publication_text": "Work",
          "publication_img": "0",
          "publication_vid": "0",
          "publication_subject": null,
          "post": null,
          "user_id": 1,
          "created_at": "2019-07-30T22:57:21.276Z",
          "updated_at": "2019-07-30T22:57:21.276Z",
          "first_name": "Evin",
          "last_name": "Dwarf",
          "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBEQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5ee852737f91d19a6638381b0799ddc1d7214cfb/ppic.jpg",
          "likes": 0,
          "promote": 0,
          "access": "1",
          "publication_type": "2",
          "work_type": "1",
          "liked": 1,
          "promoted": 1,
          "currentuser": 1
        },
        {
          "id": 2,
          "publication_text": "",
          "publication_img": "1",
          "publication_vid": "0",
          "publication_subject": null,
          "post": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--adf5d756bad0ce909829024a5eca83f8294ede9f/elements-of-art-6.jpg",
          "user_id": 1,
          "created_at": "2019-07-30T22:56:26.608Z",
          "updated_at": "2019-07-30T22:56:31.624Z",
          "first_name": "Evin",
          "last_name": "Dwarf",
          "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBEQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5ee852737f91d19a6638381b0799ddc1d7214cfb/ppic.jpg",
          "likes": 1,
          "promote": 0,
          "access": "1",
          "publication_type": "1",
          "work_type": "null",
          "liked": 1,
          "promoted": 1,
          "currentuser": 1
        },
        {
          "id": 1,
          "publication_text": "Hi my First Post",
          "publication_img": "0",
          "publication_vid": "0",
          "publication_subject": null,
          "post": null,
          "user_id": 1,
          "created_at": "2019-07-30T22:55:58.749Z",
          "updated_at": "2019-07-30T22:56:07.789Z",
          "first_name": "Evin",
          "last_name": "Dwarf",
          "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBEQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5ee852737f91d19a6638381b0799ddc1d7214cfb/ppic.jpg",
          "likes": 1,
          "promote": 1,
          "access": "1",
          "publication_type": "1",
          "work_type": null,
          "liked": 1,
          "promoted": 1,
          "currentuser": 1
        },
                {
          "id": 5,
          "publication_text": "hi",
          "publication_img": "1",
          "publication_vid": "0",
          "publication_subject": null,
          "post": null,
          "user_id": 1,
          "created_at": "2019-10-06T00:45:04.922Z",
          "updated_at": "2019-10-06T00:45:04.922Z",
          "first_name": "Evin",
          "last_name": "Dwarf",
          "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBEQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5ee852737f91d19a6638381b0799ddc1d7214cfb/ppic.jpg",
          "likes": 0,
          "promote": 0,
          "access": "1",
          "publication_type": "2",
          "work_type": "2",
          "liked": 1,
          "promoted": 1,
          "currentuser": 1
        },
        {
          "id": 4,
          "publication_text": "",
          "publication_img": "1",
          "publication_vid": "0",
          "publication_subject": null,
          "post": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBDZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e9969452fee34196b780504a18f90b786f1c6bc3/elements-of-art-6.jpg",
          "user_id": 1,
          "created_at": "2019-07-31T05:54:46.945Z",
          "updated_at": "2019-09-18T04:50:06.662Z",
          "first_name": "Evin",
          "last_name": "Dwarf",
          "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBEQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5ee852737f91d19a6638381b0799ddc1d7214cfb/ppic.jpg",
          "likes": 1,
          "promote": 0,
          "access": "1",
          "publication_type": "1",
          "work_type": "null",
          "liked": 1,
          "promoted": 1,
          "currentuser": 1
        },
        {
          "id": 3,
          "publication_text": "Work",
          "publication_img": "0",
          "publication_vid": "0",
          "publication_subject": null,
          "post": null,
          "user_id": 1,
          "created_at": "2019-07-30T22:57:21.276Z",
          "updated_at": "2019-07-30T22:57:21.276Z",
          "first_name": "Evin",
          "last_name": "Dwarf",
          "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBEQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5ee852737f91d19a6638381b0799ddc1d7214cfb/ppic.jpg",
          "likes": 0,
          "promote": 0,
          "access": "1",
          "publication_type": "2",
          "work_type": "1",
          "liked": 1,
          "promoted": 1,
          "currentuser": 1
        },
        {
          "id": 2,
          "publication_text": "",
          "publication_img": "1",
          "publication_vid": "0",
          "publication_subject": null,
          "post": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--adf5d756bad0ce909829024a5eca83f8294ede9f/elements-of-art-6.jpg",
          "user_id": 1,
          "created_at": "2019-07-30T22:56:26.608Z",
          "updated_at": "2019-07-30T22:56:31.624Z",
          "first_name": "Evin",
          "last_name": "Dwarf",
          "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBEQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5ee852737f91d19a6638381b0799ddc1d7214cfb/ppic.jpg",
          "likes": 1,
          "promote": 0,
          "access": "1",
          "publication_type": "1",
          "work_type": "null",
          "liked": 1,
          "promoted": 1,
          "currentuser": 1
        },
        {
          "id": 1,
          "publication_text": "Hi my First Post",
          "publication_img": "0",
          "publication_vid": "0",
          "publication_subject": null,
          "post": null,
          "user_id": 1,
          "created_at": "2019-07-30T22:55:58.749Z",
          "updated_at": "2019-07-30T22:56:07.789Z",
          "first_name": "Evin",
          "last_name": "Dwarf",
          "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBEQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5ee852737f91d19a6638381b0799ddc1d7214cfb/ppic.jpg",
          "likes": 1,
          "promote": 1,
          "access": "1",
          "publication_type": "1",
          "work_type": null,
          "liked": 1,
          "promoted": 1,
          "currentuser": 1
        }
      ]
    };
    this.getUpdates = this.getUpdates.bind(this);
    this.getWorks = this.getWorks.bind(this);
    this.onFileUploadCoverPic = this.onFileUploadCoverPic.bind(this);
    this.initProfilePic = this.initProfilePic.bind(this);
    this.editProfile = this.editProfile.bind(this);
  }
  componentDidMount() {
    this.setState({ workPublication: this.getWorks() });
    this.setState({ updatedPublication: this.getUpdates() });
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps, this.props)) {
      this.setState({ workPublication: this.getWorks() });
      this.setState({ updatedPublication: this.getUpdates() });
      this.initProfilePic();
    }
  }
  getWorks() {
    return this.props.userPublications.filter(
      publication => publication.publication_type === "2"
    );
  }
  getUpdates() {
    return this.props.userPublications.filter(
      publication => publication.publication_type === "1"
    );
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
  render() {
    console.log(this.state);
    return (
      <div className="right">
        <Tabs
          id="controlled-tab-example"
          activeKey={this.state.selectedTab}
          onSelect={key => this.setState({ selectedTab: key })}
        >
          <Tab eventKey="updates" title="Chronicles" unmountOnExit={true}>
            {this.state.updatedPublication.map((userPublication, index) => (
              <ContentCard
                key={index}
                postIndex={index}
                userPublication={userPublication}
                userPublications={this.props.userPublications}
              />
            ))}
          </Tab>
          <Tab eventKey="works" title="Works" unmountOnExit={true}>
            <div className="text-right">
              <button className="mt-2 btn edit-profile-button-background" onClick={(e) => {
                e.preventDefault();
                this.setState({ showAddCollectionModel: true });
              }}>Create Collection</button>
              <AddCollectionModel workPublication={this.state.workPublication} show={this.state.showAddCollectionModel} onHide={() => {
                this.setState({ showAddCollectionModel: false });
              }} />
            </div>
            {this.state.workPublication.map((userPublication, index) => (
              <ContentCard
                key={index}
                postIndex={index}
                userPublication={userPublication}
                userPublications={this.props.userPublications}
              />
            ))}
          </Tab>
          <Tab eventKey="audience" title="Audience" unmountOnExit={true}>
            <div>Audience</div>
          </Tab>
        </Tabs>

        {this.props.loading && (
          <div className="mt-3 font-weight-bold">
            <Alert variant="light">
              <Spinner animation="grow" size="sm" /> Loading...
            </Alert>
          </div>
        )}
      </div>
    );
  }
}
