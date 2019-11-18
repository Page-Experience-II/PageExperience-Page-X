import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Card, Image } from "react-bootstrap";
import VideoThumbnail from '../generic/VideoThumbnail';

import "./AddCollectionModel.scss";
import { BASE_URL } from "../../app.constants";
import { createCollection } from "../../actions/userPublicationAction";

export default class AddCollectionModel extends Component {
    static propTypes = {
        show: PropTypes.bool.isRequired,
        onHide: PropTypes.func.isRequired,
        workPublication: PropTypes.array
    };

    constructor(props) {
        super(props);
        this.state = { postIds: [], coverPostId: -1, title: "" };
    }

    addToCollection(id) {
        let postIds = this.state.postIds;
        if (this.getSelection(id)) {
            postIds = postIds.filter(w => w !== id);
        } else {
            postIds.push(id);
        }
        this.setState({ postIds });
    }

    getSelection(id) {
        return this.state.postIds.find(w => w === id) ? true : false;
    }

    getSelected() {
        return this.props.workPublication.filter(w => this.state.postIds.indexOf(w.id) > -1);
    }

    saveCollection() {
        createCollection(this.state);
        this.props.onHide();
    }

    render() {
        const { show, onHide, workPublication } = this.props;
        return (
            <Modal
                show={show}
                onHide={onHide}
                centered
                id="createCollectionModal"
                size="lg"
                className="publication-modal modal"
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton>
                    <div className="header-title">Create Collection</div>
                </Modal.Header>
                <Modal.Body className="p-3">
                    <h3>Recent Pieces</h3>
                    <div className="form-group">
                        <div className="col-md-12" style={{ maxHeight: "300px", overflow: "auto" }}>
                            {workPublication && workPublication.map(w => {
                                return <div key={"main-" + w.id} className={"border col-md-3 float-left mb-2 mr-3 " +
                                    (this.getSelection(w.id) ? "border-info" : "")}
                                    style={{
                                        cursor: "pointer", minWidth: "184px", maxWidth: "184px",
                                        minHeight: "200px", maxHeight: "200px"
                                    }} onClick={() => { this.addToCollection(w.id); }}>

                                    <div style={{
                                        minHeight: "150px", maxHeight: "150px"
                                    }}>
                                        {w.publication_img === "1" &&
                                            <img className="pt-3" style={{ width: "100%" }} src={w.post} />}
                                        {w.publication_vid === "1" &&
                                            <video
                                                src={BASE_URL + w.post} className="pt-3" style={{ width: "100%" }} />
                                        }
                                    </div>

                                    <br />
                                    <p style={{ fontSize: "12px" }} dangerouslySetInnerHTML={{ __html: w.publication_text }}></p>
                                </div>
                            })}
                        </div>
                    </div>
                    <hr />
                    <h2 className="mt-3">Selected Pieces</h2>

                    <div className="col-md-12">

                        <br />
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" className="form-control" value={this.state.title} onChange={(e) => {
                                this.setState({ title: e.target.value });
                            }} />
                        </div>
                        <div className="col-md-12" style={{ maxHeight: "300px", overflow: "auto" }}>
                            {this.getSelected().map(w => {
                                return <div key={"selection-" + w.id} className={"border col-md-2 float-left mb-2 mr-3 border-info"}
                                    style={{
                                        cursor: "pointer", minWidth: "110px", maxWidth: "110px",
                                        minHeight: "170px", maxHeight: "170px"
                                    }}>

                                    <div style={{ minHeight: "118px", maxHeight: "118px" }}>
                                        <input type="radio" name="coverpic" onChange={(e) => {
                                            this.setState({ coverPostId: w.id });
                                        }} />
                                        {w.publication_img === "1" &&
                                            <img className="pt-3" style={{ width: "100%" }} src={w.post} />}
                                        {w.publication_vid === "1" &&
                                            <video
                                                src={BASE_URL + w.post} className="pt-3" style={{ width: "100%" }} />
                                        }
                                    </div>

                                    <br />
                                    <p style={{ fontSize: "12px" }} dangerouslySetInnerHTML={{ __html: w.publication_text }}></p>
                                </div>
                            })}
                        </div>
                    </ div>
                </Modal.Body>
                <Modal.Footer style={{ flexDirection: "initial" }}>
                    <button disabled={this.state.title.length === 0 || this.state.postIds.length === 0 || this.state.coverPostId < 1}
                        type="button" className="btn btn-primary" onClick={() => { this.saveCollection() }}>Create</button>
                </Modal.Footer>
            </Modal >
        );
    }
}
