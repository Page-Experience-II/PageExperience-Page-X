import React, { Component } from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, DropdownButton, Dropdown, Form, Image } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { BASE_URL } from "../../app.constants";
import { postPublication } from "../../actions/userPublicationAction";
import { getWorkTypes } from "../../actions/workTypeAction";
import { getAccessTypes } from "../../actions/accessTypeAction";
import { Link } from "react-router-dom";
import Attachment from "../generic/Attachment";

import "./Publication.scss";
import DropdownItem from "react-bootstrap/DropdownItem";

import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6

const INITIAL_STATE = {
  text: "",
  attachment: null,
  accessType: null,
  workType: "null",
  posting: false,
  subject: "",
  showEditorToolBar: false,
  isManuscript: false
};

const Quill = ReactQuill.Quill
var Font = Quill.import('formats/font');
Font.whitelist = ['SansSerif', 'Serif', 'Monospace'];
Quill.register(Font, true);

class Publication extends Component {
  static propTypes = {
    publicationType: PropTypes.oneOf(["update", "work"]).isRequired,
    workTypes: PropTypes.array,
    accessTypes: PropTypes.array,
    onSubmit: PropTypes.func
  };

  state = INITIAL_STATE;

  static getDerivedStateFromProps(props, state) {
    const derived = {};
    if (props.accessTypes && props.accessTypes.length && !state.accessType) {
      derived.accessType = props.accessTypes.find(
        t => t.accesstype === "Public"
      );
    }
    return derived;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.posting !== this.props.posting) {
      if (this.props.posting) {
        this.setState({ posting: true });
      } else {
        if (this.props.onSubmit) {
          this.props.onSubmit();
        } else {
          this.setState(INITIAL_STATE);
        }
      }
    }
  }

  isValid() {
    const { text, attachment, accessType, workType } = this.state;
    // either text or attachment should be provided
    if (!text && !attachment) {
      return false;
    }
    if (this.props.publicationType === "work") {
      // when publication is opened via "Create+" user has to select access type and work type.
      return accessType;// && workType;
    }
    return this.props.publicationType === "update";
  }

  componentDidMount() {
    if (this.props.workTypes.length === 0) {
      this.props.getWorkTypes();
    }
    if (this.props.accessTypes.length === 0) {
      this.props.getAccessTypes();
    }
  }

  onPublicationTextChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onUpload = attachment => {
    this.setState({ attachment });
  };

  onRemove = () => {
    this.setState({ attachment: null });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.postPublication({
      ...this.state,
      publicationType: this.props.publicationType
    });
    if (document.getElementsByClassName("close").length > 0)
      document.getElementsByClassName("close")[0].click()
  };

  renderAccessTypeItem = accessType => (
    <React.Fragment>
      {accessType && accessType.accesstype === "Public" && (
        <FontAwesomeIcon className="access-type__icon" />
      )}
      {accessType && accessType.accesstype === "Restricted" && (
        <FontAwesomeIcon className="access-type__icon" />
      )}
      {accessType ? accessType.accesstype : ""}
    </React.Fragment>
  );

  renderWorkTypeItem = workType => (
    <Dropdown.Item
      key={workType.id}
      onClick={() => this.setState({ workType })}
    >
      {workType.worktype}
    </Dropdown.Item>
  );

  get workTypeDropdown() {
    return (
      this.props.publicationType === "work" && (
        <DropdownButton
          title={this.state.workType ? this.state.workType.worktype : "Forms"}
          className="publication-form__work-type"
        >
          {this.props.workTypes.map(this.renderWorkTypeItem)}
        </DropdownButton>
      )
    );
  }

  get accessTypeDropdown() {
    return (
      this.props.publicationType === "work" && (
        <DropdownButton
          className="flex-grow-1 access-type float-right"
          title={this.renderAccessTypeItem(this.state.accessType)}
        >
          <div className="NavDropDownArrow"></div>
          {this.props.accessTypes.map(accessType => (
            <Dropdown.Item
              key={accessType.id}
              onClick={() => this.setState({ accessType })}
            >
              {this.renderAccessTypeItem(accessType)}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      )
    );
  }

  get publishWorkButton() {
    return (
      this.props.publicationType === "work" && (
        <div className="d-flex flex-grow-1 justify-content-end">
          <button
            onClick={(e) => {
              this.setState({ isManuscript: true }, () => {
                this.onSubmit(e)
              });
              e.preventDefault();
            }}
            disabled={!this.isValid()}
            className="publish-button__update btn mr-2"
          >
            <span className="ml-2"> Add to Manuscript</span>
          </button>
          <button
            onClick={this.onSubmit}
            disabled={!this.isValid()}
            className="publish-button__work btn"
          >
            <span className="ml-2">Publish</span>
          </button>
        </div>
      )
    );
  }

  get publishUpdateButton() {
    return (
      this.props.publicationType === "update" && (
        <div className="d-flex flex-grow-1 justify-content-end">
          <button
            disabled={!this.isValid()}
            onClick={this.onSubmit}
            className="publish-button__update btn"
          >
            <span className="ml-2"> Publish</span>
          </button>
        </div>
      )
    );
  }

  render() {
    const { className } = this.props;
    let sty = "shadow p-3 rounded";
    const Outside = () => {
console.log("=====================================================");
      return (
        ReactDOM.createPortal(<span style={{ float: "right" }}><button > Done </button></span>, document.querySelector('.ql-editor'))
      );
    }

    // let dropDown = "";
    // if (this.props.from) {
    //   if (this.props.from === "modal") {
    //     sty = "";
    //     dropDown = (
    //       <DropdownButton id="workType" className="ml-1 flex-grow-1 float-right mr-4" title={this.state.workType ? this.state.workType.worktype : "Please Select"}>
    //         <div className="NavDropDownArrow"></div>
    //         <DropdownItem onClick={() => {
    //           this.setState({ workType: null });
    //           document.getElementById("workType").click()
    //         }}>Please Select</DropdownItem>
    //         <DropdownItem onClick={() => {
    //           this.setState({ workType: { id: 1, worktype: "Piece" } });
    //           document.getElementById("workType").click()
    //         }}>Piece</DropdownItem>
    //         <DropdownItem onClick={() => {
    //           this.setState({ workType: { id: 2, worktype: "Opinion" } });
    //           document.getElementById("workType").click()
    //         }}>Opinion</DropdownItem>
    //       </DropdownButton>
    //     );
    //   }
    // }    
    if (this.state.showEditorToolBar === false) {
      Publication.modules = {
        toolbar: false
      }
    } else {
      Publication.modules = {
        toolbar: [
          [{ size: [] }],
          [{ 'header': '1' }, { 'header': '2' }, { 'font': Font.whitelist }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' },
          { 'indent': '-1' }, { 'indent': '+1' }],
          ['link'],
          ['clean']
        ]
      }
    }
    return (
      <Form className={`publication-form ${sty} ${className || ""}`}>
        <div id="divalert" className="alert alert-success"
          style={{ display: "none" }}></div>
        <Card>
          <Card.Body className="publication-form__body">
            <div className={this.props.publicationType === "work" ? "" : "d-flex"}>
              <figure className="navbar-avatar float-left">
                <Link to="/profile">
                  <Image
                    src={
                      this.props.user && BASE_URL + this.props.user[0].avatar
                    }
                    className="navbar-avatar__image"
                  />
                </Link>
              </figure>

              {this.props.publicationType === "work" &&
                < div className="form-group">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({ showEditorToolBar: !this.state.showEditorToolBar })
                    }}
                    className="btn float-right mb-2 publish-button__update"
                  >
                    <span className="ml-2"> {!this.state.showEditorToolBar ? "Edit" : "Edit"}</span>
                  </button>
                </div>}

              {/* {dropDown} */}

              {/* {this.props.publicationType === "work" && this.state.workType && this.state.workType.worktype === "Opinion" &&

                <div className="form-group">
                  <Form.Control
                    placeholder="Subject"
                    name="subject"
                    value={this.state.subject}
                    onChange={this.onPublicationTextChange}
                  />
                </div>} */}

              {this.props.publicationType === "work" &&
                <div className="publication-form__control" style={{ clear: "both", height: "200px" }}>
                  <ReactQuill
                    style={{ clear: "both", height: "200px" }}
                    id="quill-editor"
                    name="text"
                    theme="snow"
                    onChange={(e) => { this.setState({ text: e }); }}
                    value={this.state.text}
                    modules={Publication.modules}
                    formats={Publication.formats}
                  /><br />
                  {document.getElementById('quill-editor') && <Outside />}
                </div>}
              {this.props.publicationType !== "work" &&
                <div className="publication-form__control">
                  <Form.Control
                    placeholder="Share with the world your latest piece..."
                    className="publication-form__textarea"
                    as="textarea"
                    rows="3"
                    name="text"
                    value={this.state.text}
                    onChange={this.onPublicationTextChange}
                  />
                </div>}
            </div>
          </Card.Body>
        </Card>
        <div className="publication-form__attachments">
          <Attachment
            attachment={this.state.attachment}
            onUpload={this.onUpload}
            onRemove={this.onRemove}
          />
          {/* {this.accessTypeDropdown} */}

          {this.publishUpdateButton}
          {this.publishWorkButton}
        </div>

      </Form >
    );
  }
}

const mapStateToProps = ({
  userInfo,
  workTypes,
  accessTypes,
  userPublications
}) => ({
  user: userInfo.user,
  workTypes: workTypes.workTypes || [],
  accessTypes: accessTypes.accessTypes || [],
  posting: userPublications.posting
});

const mapDispatchersToProps = {
  postPublication,
  getWorkTypes,
  getAccessTypes
};

export default connect(
  mapStateToProps,
  mapDispatchersToProps
)(Publication);

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */

/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Publication.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

