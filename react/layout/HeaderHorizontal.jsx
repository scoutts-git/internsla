import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Nav,
  Collapse,
  NavItem,
  NavbarToggler
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../store/actions/actions";
import HeaderRun from "./Header.run";

class HeaderHorizontal extends Component {
  state = {
    isOpen: false
  };

  componentDidMount() {
    HeaderRun();
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  toggleOffsidebar = e => {
    e.preventDefault();
    this.props.actions.toggleSetting("offsidebarOpen");
  };

  render() {
    return (
      <header className="topnavbar-wrapper">
        {/* START Top Navbar */}
        <nav className="navbar topnavbar navbar-expand-lg navbar-light">
          {/* START navbar header */}
          <div className="navbar-header ">
            <NavbarToggler onClick={this.toggle} />
          </div>
          {/* END navbar header */}
          {/* START Nav wrapper */}
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar className="mr-auto flex-column flex-lg-row">
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>Dashboard</DropdownToggle>
                <DropdownMenu className="animated fadeIn">
                  <Link className="dropdown-item" to="dashboard">
                    Dashboard v1
                  </Link>
                  <Link className="dropdown-item" to="dashboardv2">
                    Dashboard v2
                  </Link>
                  <Link className="dropdown-item" to="dashboardv3">
                    Dashboard v3
                  </Link>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <Link className="nav-link" to="widgets">
                  Widgets
                </Link>
              </NavItem>
              {/* END Left navbar */}
            </Nav>
          </Collapse>
          {/* END Nav wrapper */}
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

HeaderHorizontal.propTypes = {
  actions: PropTypes.shape({
    toggleSetting: PropTypes.func
  }),
  settings: PropTypes.shape({})
};

const mapStateToProps = state => ({ settings: state.settings });
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderHorizontal);
