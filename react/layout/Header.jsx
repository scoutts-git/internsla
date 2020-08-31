/* eslint react/forbid-prop-types: 0 */ // --> OFF
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../store/actions/actions";
import HeaderRun from "../uiHelpers/Header.run";
import { FaSignOutAlt, FaUserAlt, FaBars } from "react-icons/fa";
import { logOut } from "../../services/userService";
import { withRouter } from "react-router-dom";

class Header extends Component {
  componentDidMount() {
    HeaderRun();
  }

  toggleUserblock = e => {
    e.preventDefault();
    this.props.actions.toggleSetting("showUserBlock");
  };

  toggleOffsidebar = e => {
    e.preventDefault();
    this.props.actions.toggleSetting("offsidebarOpen");
  };

  toggleCollapsed = e => {
    e.preventDefault();
    this.props.actions.toggleSetting("isCollapsed");
    this.resize();
    this.props.actions.toggleSetting("asideToggled");
  };

  toggleAside = e => {
    e.preventDefault();
    this.props.actions.toggleSetting("asideToggled");
  };

  resize() {
    var evt = document.createEvent("UIEvents");
    evt.initUIEvent("resize", true, false, window, 0);
    window.dispatchEvent(evt);
  }

  handleLogOut = () => {
    logOut()
      .then(this.logOutSuccess)
      .catch(this.logOutError);
  };

  logOutSuccess = () => {
    this.props.history.push("/", {
      type: "logout",
      currentUser: {
        roles: [],
        name: "",
        email: "",
        isLoggedIn: false
      }
    });
  };

  logOutError = () => {};

  render() {
    return (
      <header className="adminNavbar topnavbar-wrapper">
        {/* START Top Navbar */}
        <nav className="navbar topnavbar">
          <a className="nav-link nav-header" href="/">
            <h3>iNTERNS.la</h3>
          </a>
          {/* START Left navbar */}
          <ul className="navbar-nav mr-auto flex-row offset-md-1">
            <li className="nav-item">
              {/* Button used to collapse the left sidebar. Only visible on tablet and desktops */}
              <a href="" className="nav-link" onClick={this.toggleCollapsed}>
                <FaBars size="20" />
              </a>
              {/* Button to show/hide the sidebar on mobile. Visible on mobile only. */}
            </li>
            {/* START User avatar toggle */}
            <li className="nav-item">
              <a className="nav-link" onClick={this.toggleUserblock}>
                <FaUserAlt size="20" />
              </a>
            </li>
            {/* END User avatar toggle */}
            {/* START lock screen */}
            {/* Logout */}
            <li className="nav-item">
              <a className="nav-link" onClick={this.handleLogOut}>
                {/* <em className="icon-refresh" /> */}
                <FaSignOutAlt size="20" />
              </a>
            </li>
            {/* End LogOut */}

            {/* END lock screen */}
          </ul>
          {/* END Left navbar */}
          {/* START Right Navbar */}
          <ul className="navbar-nav flex-row">
            {/* START Offsidebar button */}
            {/* END Offsidebar menu */}
          </ul>
          {/* END Right Navbar */}
          {/* START Search form */}
          <form className="navbar-form" role="search" action="search.html">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Type and hit enter ..."
              />
              <div
                className="fa fa-times navbar-form-close"
                data-search-dismiss=""
              />
            </div>
            <button className="d-none" type="submit">
              Submit
            </button>
          </form>
          {/* END Search form */}
        </nav>
        {/* END Top Navbar */}
      </header>
    );
  }
}

Header.propTypes = {
  actions: PropTypes.shape({ toggleSetting: PropTypes.func }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

const mapStateToProps = state => ({ settings: state.settings });
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
