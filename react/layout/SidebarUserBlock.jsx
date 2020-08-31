import React, { Component } from "react";
import PropTypes from "prop-types";
import { Collapse } from "reactstrap";
import { connect } from "react-redux";
import logger from "sabio-debug";
import * as userProfileService from "../../services/userProfileService";
import { FaEdit } from "react-icons/fa";
import { withRouter } from "react-router-dom";
import "./Base.css";

const _logger = logger.extend("AppRoutes");

class SidebarUserBlock extends Component {
  state = {
    isShowingUserBlock: false,
    currentUser: {
      name: "",
      role: "",
      avatarUrl:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__480.png",
    },
  };

  componentDidMount() {
    userProfileService
      .getById(this.props.currentUser.id)
      .then(this.getByIdSuccess)
      .catch(this.getByIdError);
  }

  static getDerivedStateFromProps(props) {
    if (this) {
      if (props.isShowingUserBlock !== this.props.isShowingUserBlock) {
        return { isShowingUserBlock: props.isShowingUserBlock };
      }
    } else if (typeof props.isShowingUserBlock === "boolean") {
      return { isShowingUserBlock: props.isShowingUserBlock };
    }
    return null;
  }

  editProfile = () => {
    _logger("editProfile Click");
    _logger(this.props.history);
    let id = this.props.currentUser.id;
    let org = this.props.currentUser.roles;
    let found = org.includes("Organization");
    if (found) {
      this.props.history.push(`/organization/${id}/edit`);
    } else {
      this.props.history.push(`/seeker/${id}/edit`);
    }
  };

  getByIdSuccess = (res) => {
    _logger("getByIdSuccess");
    this.setState({ userData: res.item });
  };

  getByIdError = () => {
    _logger("getByIdError");
  };

  render() {
    return (
      <Collapse id="user-block" isOpen={this.state.isShowingUserBlock}>
        <div>
          <div className="item user-block">
            {/* User picture */}
            <div
              className="user-block-picture"
              onClick={
                this.props.currentUser.roles[0] === "Seeker"
                  ? () =>
                      this.props.history.push(
                        `/seeker/${this.props.currentUser.id}/details`
                      )
                  : null
              }
            >
              <div className="user-block-status">
                <img
                  className="img-thumbnail rounded-circle thumb64"
                  src={
                    this.props.currentUser.avatarUrl
                      ? this.props.currentUser.avatarUrl
                      : this.state.currentUser.avatarUrl
                  }
                  alt="Avatar"
                  width="70"
                  height="auto"
                />
                <div className="circle bg-success circle-lg" />
              </div>
            </div>

            {/* Name and Job */}
            <div className="user-block-info">
              <span className="user-block-name">
                {this.props.currentUser.name}
              </span>
              <span className="user-block-role">
                {this.props.currentUser.roles.toString()}
              </span>
              <button
                type="button"
                className="btn btn-edit editBtn"
                onClick={this.editProfile}
              >
                <FaEdit size="25" />
              </button>
            </div>
          </div>
        </div>
      </Collapse>
    );
  }
}

SidebarUserBlock.propTypes = {
  isShowingUserBlock: PropTypes.bool,
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    roles: PropTypes.array,
    avatarUrl: PropTypes.string,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

const mapStateToProps = (state) => ({
  isShowingUserBlock: state.settings.showUserBlock,
});

export default withRouter(connect(mapStateToProps)(SidebarUserBlock));
