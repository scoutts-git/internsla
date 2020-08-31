/* eslint react/forbid-prop-types: 0 */ // --> OFF
/* eslint react/prop-types: 0 */ // --> OFF
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTranslation, Trans } from "react-i18next";
import { Link, withRouter } from "react-router-dom";
import { Collapse, Badge } from "reactstrap";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../store/actions/actions";

import SidebarRun from "../uiHelpers/Sidebar.run";
import SidebarUserBlock from "./SidebarUserBlock";

import Menu from "../uiHelpers/Menu";

/** Component to display headings on sidebar */
const SidebarItemHeader = ({ item }) => (
  <li className="nav-heading">
    <span>
      <Trans i18nKey={item.translate}>{item.heading}</Trans>
    </span>
  </li>
);
SidebarItemHeader.propTypes = {
  item: PropTypes.object.isRequired
};

/** Normal items for the sidebar */
const SidebarItem = ({ item, isActive }) => (
  <li className={isActive ? "active" : ""}>
    <Link to={item.path} title={item.name}>
      {item.label && (
        <Badge tag="div" className="float-right" color={item.label.color}>
          {item.label.value}
        </Badge>
      )}
      {item.icon && <em className={item.icon} />}
      <span>
        <Trans i18nKey={item.translate}>{item.name}</Trans>
      </span>
    </Link>
  </li>
);
SidebarItem.propTypes = {
  isActive: PropTypes.bool.isRequired,

  item: PropTypes.object.isRequired
};

/** Build a sub menu with items inside and attach collapse behavior */
const SidebarSubItem = ({ item, isActive, handler, children, isOpen }) => (
  <li className={isActive ? "active" : ""}>
    <div className="nav-item" onClick={handler}>
      {item.label && (
        <Badge tag="div" className="float-right" color={item.label.color}>
          {item.label.value}
        </Badge>
      )}
      {item.icon && <em className={item.icon} />}
      <span>
        <Trans i18nKey={item.translate}>{item.name}</Trans>
      </span>
    </div>
    <Collapse isOpen={isOpen}>
      <ul id={item.path} className="sidebar-nav sidebar-subnav">
        {children}
      </ul>
    </Collapse>
  </li>
);

SidebarSubItem.propTypes = {
  isActive: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  // item: PropTypes.object.isRequired,
  handler: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired
};

/** Component used to display a header on menu when using collapsed/hover mode */
const SidebarSubHeader = ({ item }) => (
  <li className="sidebar-subnav-header">{item.name}</li>
);
SidebarSubHeader.propTypes = {
  item: PropTypes.object.isRequired
};

class Sidebar extends Component {
  state = {
    collapse: {},
    filteredMenuItems: []
  };

  componentDidMount() {
    // pass navigator to access router api
    SidebarRun(this.navigator, this.closeSidebar);
    // prepare the flags to handle menu collapsed states
    this.buildCollapseList();

    // Listen for routes changes in order to hide the sidebar on mobile
    this.props.history.listen(this.closeSidebar);
  }

  closeSidebar = () => {
    this.props.actions.toggleSetting("asideToggled");
  };

  /** prepare initial state of collapse menus. Doesnt allow same route names */
  buildCollapseList = () => {
    let collapse = {};
    const roles = this.props.currentUser.roles;
    const filteredMenuItems = Menu.filter(item =>
      item.roles.some(role => roles.includes(role))
    );
    filteredMenuItems
      .filter(({ heading }) => !heading)
      .forEach(({ name, path, submenu }) => {
        collapse[name] = this.routeActive(
          submenu ? submenu.map(({ path }) => path) : path
        );
      });
    this.setState({ collapse, filteredMenuItems });
  };

  
  navigator = route => {
    this.props.history.push(route);
  };

  routeActive(paths) {
    paths = Array.isArray(paths) ? paths : [paths];
    return paths.some(p => this.props.location.pathname.indexOf(p) > -1);
  }

  toggleItemCollapse(stateName) {
    for (let c in this.state.collapse) {
      if (this.state.collapse[c] === true && c !== stateName)
        this.setState({
          collapse: {
            [c]: false
          }
        });
    }
    this.setState({
      collapse: {
        [stateName]: !this.state.collapse[stateName]
      }
    });
  }

  getSubRoutes = item => item.submenu.map(({ path }) => path);

  /** map menu config to string to determine which element to render */
  itemType = item => {
    if (item.heading) return "heading";
    if (!item.submenu) return "menu";
    if (item.submenu) return "submenu";
  };

  render() {
    return (
      <aside className="aside-container">
        {/* START Sidebar (left) */}
        <div className="aside-inner">
          <nav data-sidebar-anyclick-close="" className="sidebar">
            {/* START sidebar nav */}
            <ul className="sidebar-nav">
              {/* START user info */}
              <li className="has-user-block">
                <SidebarUserBlock currentUser={this.props.currentUser}/>
              </li>
              {/* END user info */}

              {/* Iterates over all sidebar items */}
              {this.state.filteredMenuItems.map((item, i) => {
                // heading
                if (this.itemType(item) === "heading")
                  return <SidebarItemHeader item={item} key={i} />;
                else {
                  if (this.itemType(item) === "menu")
                    return (
                      <SidebarItem
                        isActive={this.routeActive(item.path)}
                        item={item}
                        key={i}
                      />
                    );
                  if (this.itemType(item) === "submenu")
                    return [
                      <SidebarSubItem
                        item={item}
                        isOpen={this.state.collapse[item.name] || false}
                        handler={this.toggleItemCollapse.bind(this, item.name)}
                        isActive={this.routeActive(this.getSubRoutes(item))}
                        key={i}
                      >
                        <SidebarSubHeader item={item} key={i} />
                        {item.submenu.map((subitem, i) => (
                          <SidebarItem
                            key={i}
                            item={subitem}
                            isActive={this.routeActive(subitem.path)}
                          />
                        ))}
                      </SidebarSubItem>
                    ];
                }
                return null; // unrecognized item
              })}
            </ul>
            {/* END sidebar nav */}
          </nav>
        </div>
        {/* END Sidebar (left) */}
      </aside>
    );
  }
}

Sidebar.propTypes = {
  actions: PropTypes.object,
  settings: PropTypes.object,
  item: PropTypes.object,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired,
    state: PropTypes.object
  }),
  history: PropTypes.shape({
    listen: PropTypes.func.isRequired,
    path: PropTypes.shape({ indexOf: PropTypes.func }),
    push: PropTypes.func.isRequired
  }),
  currentUser: PropTypes.shape({
    roles: PropTypes.array,
    userName: PropTypes.string,
    email: PropTypes.string,
    isLoggedIn: PropTypes.bool
  })
};

const mapStateToProps = state => ({ settings: state.settings });
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation("translations")(withRouter(Sidebar)));
