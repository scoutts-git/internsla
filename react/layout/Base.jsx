/* eslint react/forbid-prop-types: 0 */ // --> OFF
import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Offsidebar from "./Offsidebar";

const Base = props => (
  <div className="wrapper">
    <Header />

    <Sidebar currentUser={props.currentUser} />

    <Offsidebar />

    <section className="section-container">{props.children}</section>
  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired,
  currentUser: PropTypes.shape({
    roles: PropTypes.array,
    name: PropTypes.string,
    email: PropTypes.string,
    isLoggedIn: PropTypes.bool
  })
};

export default Base;
