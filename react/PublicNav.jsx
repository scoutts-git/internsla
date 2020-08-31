import React from "react";
import { Nav, Navbar, NavLink } from "react-bootstrap";
import PropTypes from "prop-types";
import { FaSignOutAlt } from "react-icons/fa";
import { logOut } from "../../services/userService";
import "./Landing.css";

const PublicNav = (props) => {
  const handleLogOut = () => {
    logOut().then(logOutSuccess).catch(logOutError);
  };

  const logOutSuccess = () => {
    props.history.push("/", {
      type: "logout",
      currentUser: {
        roles: [],
        name: "",
        email: "",
        isLoggedIn: false,
      },
    });
  };

  const logOutError = () => {};

  return (
    <React.Fragment>
      <Navbar className="navbar-default" bg="light" expand="lg">
        <nav className="navbar navbariL navbar-expand-lg fixed-top navbar-light">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navTop"></Nav>
            <Navbar.Brand className="navbar-brand" href="/">
              <img
                alt="iNTERNS.la"
                className="logo"
                src="https://sabio-training.s3-us-west-2.amazonaws.com/intern_fd6fe7ea-5791-45f3-841d-24de4865c29alogo_interns_la.png"
              />
            </Navbar.Brand>
          </Navbar.Collapse>
          {props.currentUser.isLoggedIn &&
          props.currentUser.roles[0] === "Admin" ? (
            <NavLink className="navbar-link purple_btn" href="/admin/dashboard">
              My Dashboard
            </NavLink>
          ) : null}
          {props.currentUser.isLoggedIn ? (
            <btn className="navbar-link logout_navbar" onClick={handleLogOut}>
              <FaSignOutAlt size="20" />
            </btn>
          ) : null}
          {props.currentUser.isLoggedIn &&
          props.currentUser.roles[0] === "Organization" ? (
            <NavLink
              className="navbar-link purple_btn"
              href="/organization/dashboard"
            >
              My Dashboard
            </NavLink>
          ) : null}
          {props.currentUser.isLoggedIn &&
          props.currentUser.roles[0] === "Seeker" ? (
            <NavLink
              className="navbar-link purple_btn"
              href="/seeker/dashboard"
            >
              My Dashboard
            </NavLink>
          ) : null}
        </nav>
      </Navbar>
    </React.Fragment>
  );
};
PublicNav.propTypes = {
  currentUser: PropTypes.shape({
    roles: PropTypes.arrayOf(PropTypes.string),
    isLoggedIn: PropTypes.bool,
    profile: PropTypes.bool,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default PublicNav;
