import {
  faBell,
  faCommentAlt,
  faSearch,
  faPlus,
  faHome,
  faCog,
  faSignOutAlt,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BASE_URL } from "../../app.constants";

import PublicationModal from "../publication-modal/PublicationModal";

import "./header.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPublicationModal: false,
      searchKeyword: ""
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch = event => {
    this.setState({ searchKeyword: event.target.value });
    this.props.redirectPage(event.target.value);
  };

  showPublicationModal = () => {
    this.setState({ showPublicationModal: true });
  };

  hidePublicationModal = () => {
    this.setState({ showPublicationModal: false });
  };

  handleSubmitSearchForm = event => {
    event.preventDefault();
    this.props.onSubmitSearchKeyword(this.state.searchKeyword);
  };

  render() {
    const { user } = this.props;
    const { pathname } = this.props.location;
    return (
      <header className="header text-white">
        <PublicationModal
          show={this.state.showPublicationModal}
          onShow={this.showPublicationModal}
          onHide={this.hidePublicationModal}
        />
        <Container>
          <Row>
            <Col>
              <Navbar expand="lg" className="navbar">
                <Navbar.Brand className="navbar__brand text-white">
                  <Link to="/home">pageX</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse
                  id="basic-navbar-nav"
                  className="navbar-collapse"
                >
                  <Form
                    onSubmit={this.handleSubmitSearchForm}
                    inline
                    className="navbar-search-form"
                  >
                    <FormControl
                      onChange={this.handleSearch}
                      size="sm"
                      type="text"
                      className="mr-sm-2 navbar-search-form__control search-place"
                      placeholder="search"
                      style={{ backgroundColor: "#f2f2f2" }}
                    />
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="search-icon navbar-search-form__icon"
                      style={{ color: "#dcdcdc" }}
                    />
                  </Form>
                  <Nav className="mr-5 w-100 justify-content-end navbar-control">
                    <Button
                      className="btn-create "
                      onClick={this.showPublicationModal}
                    >
                      <FontAwesomeIcon icon={faPlus} className="" />
                      <span className="btn-text ml-1"> Create</span>
                    </Button>
                  </Nav>

                  <Nav className="navbar-right">
                    <Button className="navbar-right__button">
                      <FontAwesomeIcon
                        icon={faCommentAlt}
                        className="navbar-right__icon "
                      />
                    </Button>
                    <Button className="navbar-right__button ">
                      <FontAwesomeIcon
                        icon={faBell}
                        className="navbar-right__icon"
                      />
                    </Button>
                    <figure className="navbar-avatar rounded-circle m-1">
                      <Image
                        src={user && BASE_URL + user[0].avatar}
                        className="navbar-avatar__image"
                      />
                    </figure>

                    <NavDropdown
                      className="navbar-dropdown text-white"
                      title={
                        user && user[0].first_name 
                      }
                      id="basic-nav-dropdown"
                    >
                      <div className="NavDropDownArrow"></div>
                      {pathname !== "/profile" && (
                        <LinkContainer to="/profile">
                          <NavDropdown.Item className="navbar-dropdown__item notActive">
                            <FontAwesomeIcon
                              icon={faUser}
                              className="access-type__icon"
                            />
                            <span className="ml-2">Profile</span>
                          </NavDropdown.Item>
                        </LinkContainer>
                      )}
                      {pathname !== "/home" && (
                        <LinkContainer to="/home">
                          <NavDropdown.Item className="navbar-dropdown__item">
                            <FontAwesomeIcon
                              icon={faHome}
                              className="access-type__icon"
                            />
                            <span className="ml-2">Home</span>
                          </NavDropdown.Item>
                        </LinkContainer>
                      )}
                      <NavDropdown.Item
                        href="#"
                        className="navbar-dropdown__item"
                      >
                        <FontAwesomeIcon
                          icon={faCog}
                          className="access-type__icon"
                        />
                        <span className="ml-2">Settings</span>
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        className="navbar-dropdown__item"
                        onClick={() => {
                          localStorage.removeItem("AUTH_TOKEN");
                          this.props.logout();
                          this.props.history.replace("/login");
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faSignOutAlt}
                          className="access-type__icon"
                        />{" "}
                        <span className="ml-2">Logout</span>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Col>
          </Row>
        </Container>
      </header>
    );
  }
}

export default withRouter(Header);
